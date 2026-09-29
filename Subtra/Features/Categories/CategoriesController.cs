using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Subtra.Api.Features.Categories.Contracts;

namespace Subtra.Api.Features.Categories;

[ApiController]
[Authorize]
[Route("api/categories")]
public class CategoriesController : ControllerBase
{
    private readonly CategoryService _categoryService;
    private readonly UserManager<IdentityUser> _userManager;
    public CategoriesController(CategoryService categoryService, UserManager<IdentityUser> userManager)
    {
        _categoryService = categoryService;
        _userManager = userManager;
    }

    [HttpGet]
    public async Task<ActionResult<List<CategoryResponse>>> GetAllAsync()
    {
        var userId = _userManager.GetUserId(User);
        if (userId == null) return Unauthorized();

        return Ok(await _categoryService.GetAllAsync(userId));
    }

    [HttpPost]
    public async Task<ActionResult<CategoryResponse>> CreateAsync(CreateCategoryRequest request)
    {
        var userId = _userManager.GetUserId(User);
        if (userId == null) return Unauthorized();

        var createdCategory = await _categoryService.CreateAsync(userId, request);
        return StatusCode(StatusCodes.Status201Created, createdCategory);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<CategoryResponse>> UpdateAsync(int id, UpdateCategoryRequest request)
    {
        var userId = _userManager.GetUserId(User);
        if (userId == null) return Unauthorized();

        var updatedCategory = await _categoryService.UpdateAsync(id, userId, request);
        if (updatedCategory == null) return NotFound();

        return Ok(updatedCategory);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteAsync(int id)
    {
        var userId = _userManager.GetUserId(User);
        if (userId == null) return Unauthorized();

        var result = await _categoryService.DeleteAsync(id, userId);
        if (result == DeleteCategoryResult.NotFound) return NotFound();
        else if (result == DeleteCategoryResult.InUse) return Conflict("Category is used by subscriptions.");

        return NoContent();
    }
}

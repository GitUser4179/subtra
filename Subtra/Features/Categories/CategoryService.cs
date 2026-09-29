using Microsoft.EntityFrameworkCore;
using Subtra.Api.Data;
using Subtra.Api.Features.Categories.Contracts;
using Subtra.Api.Entities;

namespace Subtra.Api.Features.Categories;

public class CategoryService
{
    private readonly AppDbContext _context;

    public CategoryService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<CategoryResponse>> GetAllAsync(string userId)
    {
        return await _context.Categories
            .Where(category => category.UserId == userId)
            .Select(category => new CategoryResponse { Id = category.Id, Name = category.Name })
            .ToListAsync();
    }

    public async Task<CategoryResponse> CreateAsync(string userId, CreateCategoryRequest request)
    {
        var category = new Category { Name = request.Name.Trim(), UserId = userId };
        await _context.Categories.AddAsync(category);
        await _context.SaveChangesAsync();

        return new CategoryResponse { Id = category.Id, Name = category.Name };
    }

    public async Task<CategoryResponse?> UpdateAsync(int id, string userId, UpdateCategoryRequest request)
    {
        var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);
        if (category == null) return null;
        category.Name = request.Name.Trim();
        await _context.SaveChangesAsync();

        return new CategoryResponse { Id = category.Id, Name = category.Name };
    }

    public async Task<DeleteCategoryResult> DeleteAsync(int id, string userId)
    {
        var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);
        if (category == null) return DeleteCategoryResult.NotFound;
        if (await _context.Subscriptions.AnyAsync(s => s.CategoryId == id))
        {
            return DeleteCategoryResult.InUse;
        }

        _context.Categories.Remove(category);
        await _context.SaveChangesAsync();

        return DeleteCategoryResult.Deleted;
    }
}

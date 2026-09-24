using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Subtra.Api.Migrations
{
    /// <inheritdoc />
    public partial class SeedBillingIntervals : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "BillingIntervals",
                columns: new[] { "Id", "Months", "Name" },
                values: new object[,]
                {
                    { 1, 1, "Monthly" },
                    { 2, 12, "Yearly" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "BillingIntervals",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "BillingIntervals",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}

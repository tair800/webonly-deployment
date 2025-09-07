using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebOnlyAPI.Migrations
{
    /// <inheritdoc />
    public partial class ProductTexts_RemoveSections : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Safely drop legacy table if it exists (fresh DBs won't have it)
            migrationBuilder.Sql(@"
IF OBJECT_ID(N'[dbo].[ProductSections]', N'U') IS NOT NULL
BEGIN
    DROP TABLE [dbo].[ProductSections];
END
");

            migrationBuilder.AddColumn<string>(
                name: "DetailDescription",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Section1Description",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Section2Description",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Section3Description",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DetailDescription",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Section1Description",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Section2Description",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Section3Description",
                table: "Products");

            migrationBuilder.CreateTable(
                name: "ProductSections",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
                    MoreText = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    OrderIndex = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductSections", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductSections_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProductSections_ProductId",
                table: "ProductSections",
                column: "ProductId");
        }
    }
}

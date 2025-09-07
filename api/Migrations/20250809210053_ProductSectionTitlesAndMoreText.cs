using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebOnlyAPI.Migrations
{
    /// <inheritdoc />
    public partial class ProductSectionTitlesAndMoreText : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Section1MoreText",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Section1Title",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Section2MoreText",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Section2Title",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Section3MoreText",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Section3Title",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Section1MoreText",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Section1Title",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Section2MoreText",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Section2Title",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Section3MoreText",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Section3Title",
                table: "Products");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebOnlyAPI.Migrations
{
    /// <inheritdoc />
    public partial class AlignSchemaWithJsData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Telefon",
                table: "Employees",
                newName: "Phone");

            migrationBuilder.RenameColumn(
                name: "Mail",
                table: "Employees",
                newName: "Email");

            migrationBuilder.RenameColumn(
                name: "JobName",
                table: "Employees",
                newName: "Position");

            migrationBuilder.RenameColumn(
                name: "Heading",
                table: "Employees",
                newName: "Name");

            migrationBuilder.AddColumn<string>(
                name: "Alt",
                table: "References",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Alt",
                table: "References");

            migrationBuilder.RenameColumn(
                name: "Position",
                table: "Employees",
                newName: "JobName");

            migrationBuilder.RenameColumn(
                name: "Phone",
                table: "Employees",
                newName: "Telefon");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Employees",
                newName: "Heading");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Employees",
                newName: "Mail");
        }
    }
}

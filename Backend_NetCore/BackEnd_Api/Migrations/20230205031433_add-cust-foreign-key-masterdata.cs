using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackEnd_Api.Migrations
{
    public partial class addcustforeignkeymasterdata : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "CustomerId",
                table: "MastersData",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_MastersData_CustomerId",
                table: "MastersData",
                column: "CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_MastersData_Customers_CustomerId",
                table: "MastersData",
                column: "CustomerId",
                principalTable: "Customers",
                principalColumn: "Code");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MastersData_Customers_CustomerId",
                table: "MastersData");

            migrationBuilder.DropIndex(
                name: "IX_MastersData_CustomerId",
                table: "MastersData");

            migrationBuilder.AlterColumn<string>(
                name: "CustomerId",
                table: "MastersData",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);
        }
    }
}

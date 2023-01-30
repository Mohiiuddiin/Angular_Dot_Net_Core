using Microsoft.EntityFrameworkCore;

namespace BackEnd_Api.Models
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<MasterData> MastersData { get; set; }
        public DbSet<MasterDetailData> MasterDetailsData { get; set; }
    }
}

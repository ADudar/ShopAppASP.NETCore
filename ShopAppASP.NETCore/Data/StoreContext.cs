using Microsoft.EntityFrameworkCore;
using ShopAppASP.NETCore.Entities;

namespace ShopAppASP.NETCore.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
    }
}
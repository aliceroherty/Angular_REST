using RESTApi.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;

namespace RESTApi.DAL
{
    /// <summary>
    /// 
    /// </summary>
    public class WMADDbContext : DbContext
    {
        /// <summary>
        /// 
        /// </summary>
        public WMADDbContext() : base("WMADDb") {}

        /// <summary>
        /// 
        /// </summary>
        public DbSet<Customer> Customers { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public DbSet<Department> Departments { get; set; }

        /// <summary>
        /// Model Database set up
        /// </summary>
        /// <param name="modelBuilder"></param>
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}
using RESTApi.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace RESTApi.DAL
{
    /// <summary>
    /// 
    /// </summary>
    public class WMADDbInitializer : DropCreateDatabaseAlways<WMADDbContext>
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        protected override void Seed(WMADDbContext context)
        {
            var customers = new List<Customer>
            {
                new Customer{FirstName="Chris",LastName="Cusack",SSN="111-222-333"},
                new Customer{FirstName="Jennifer",LastName="Cusack",SSN="222-333-444"},
                new Customer{FirstName="Alex",LastName="Noseworthy",SSN="123-123-123"},
                new Customer{FirstName="Wallace",LastName="Girvan",SSN="444-333-111"},
                new Customer{FirstName="Cathy",LastName="Pierce",SSN="555-444-555"},
                new Customer{FirstName="Caitlyn",LastName="Cull",SSN="233-443-222"},
                new Customer{FirstName="Lenny",LastName="Go",SSN="555-333-444"},
                new Customer{FirstName="Jill",LastName="Smith",SSN="234-678-543"}
            };

            customers.ForEach(c => context.Customers.Add(c));

            var departments = new List<Department>
            {
                new Department { Name = "R&D", Description = "Research and Development" },
                new Department { Name = "APM", Description ="Asset Performance Management Applications" },
                new Department { Name = "LSC", Description = "Logistics and Supply Chain Applications" },
                new Department { Name = "EA", Description = "Engineering Applications" },
                new Department { Name = "MAR", Description = "Machine Learning, Artificial Intelligence and Robotics Applications" },
                new Department { Name = "PS", Description = "Professional Services and Consulting" },
                new Department { Name = "ES", Description = "Engineering Services and Consulting" },
                new Department { Name = "HR", Description = "Human Resources" },
                new Department { Name = "Accounting", Description = "Accounting" }
            };

            departments.ForEach(d => context.Departments.Add(d));

            context.SaveChanges();
        }
    }
}
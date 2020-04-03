using RESTApi.DAL;
using RESTApi.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace RESTApi.Controllers
{
    /// <summary>
    /// Customer RESTApi Controller
    /// </summary>
    [RoutePrefix("api/Customers")]
    public class CustomerController : ApiController
    {
        HttpResponseMessage response;
        private WMADDbContext db = new WMADDbContext();

        /// <summary>
        /// Get all Customers
        /// </summary>
        /// <returns>List of Customers in the repository</returns>
        [HttpGet]
        [ActionName("GetAllCustomers")]
        [Route("")]        
        public HttpResponseMessage Get()
        {
            try
            {
                //throw new Exception("Get failed and exception thrown from server");
                System.Threading.Thread.Sleep(2000);
                List<Customer> customers = db.Customers.ToList();
                response = Request.CreateResponse(HttpStatusCode.OK, customers);
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.ExpectationFailed, ex.ToString());
            }

            return response;
        }

        /// <summary>
        /// Get the details of a customer by providing an Id
        /// </summary>
        /// <param name="id">The customer Id</param>
        /// <returns>The customer by id</returns>
        [HttpGet]
        [ActionName("GetCustomer")]
        [Route("Details/{id}")]
        public async Task<HttpResponseMessage> Get(int id)
        {
            try
            {
                System.Threading.Thread.Sleep(2000);
                Customer customer = await db.Customers.FindAsync(id);
                response = Request.CreateResponse(HttpStatusCode.OK, customer);
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.ExpectationFailed, ex.ToString());
            }

            return response;
        }

        /// <summary>
        /// Create a customer
        /// </summary>
        /// <param name="customer">The customer to create</param>
        /// <returns>The successfully created customer</returns>
        [HttpPost]
        [Route("Create")]
        public async Task<HttpResponseMessage> CreateCustomer([FromBody]Customer customer)
        {
            try
            {
                System.Threading.Thread.Sleep(2000);
                db.Customers.Add(customer);                
                await db.SaveChangesAsync();
                response = Request.CreateResponse(HttpStatusCode.OK, customer);
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.ExpectationFailed, ex.ToString());
            }

            return response;
        }

        /// <summary>
        /// Update a customer
        /// </summary>
        /// <param name="customer">The customer to update</param>
        /// <returns>The success result of the customer update. Returns true upon successful update</returns>
        [HttpPost]
        [Route("Edit")]
        public async Task<HttpResponseMessage> EditCustomer([FromBody]Customer customer)
        {
            try
            {
                System.Threading.Thread.Sleep(2000);
                db.Entry(customer).State = EntityState.Modified;
                int result = await db.SaveChangesAsync();
                response = Request.CreateResponse(HttpStatusCode.OK, result == 1);
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.ExpectationFailed, ex.ToString());
            }

            return response;
        }

        /// <summary>
        /// Delete a customer
        /// </summary>
        /// <param name="id">The id of the customer to delete</param>
        /// <returns>The success result of the customer delete. Returns true upon successful deleteion</returns>
        [HttpPost]
        [Route("Delete/{id}")]
        public async Task<HttpResponseMessage> DeleteCustomer(int id)
        {
            try
            {
                System.Threading.Thread.Sleep(2000);
                Customer customer = await db.Customers.FindAsync(id);
                db.Entry(customer).State = EntityState.Deleted;
                int result = await db.SaveChangesAsync();
                response = Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.ExpectationFailed, ex.ToString());
            }

            return response;
        }

        /// <summary>
        /// Dispose of objects
        /// </summary>
        /// <param name="disposing"></param>
        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}

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
    /// 
    /// </summary>
    [RoutePrefix("api/Departments")]
    public class DepartmentController : ApiController
    {
        HttpResponseMessage response;
        private WMADDbContext db = new WMADDbContext();

        /// <summary>
        /// Get all departments
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ActionName("GetAllDepartments")]
        [Route("")]
        public HttpResponseMessage Get()
        {
            try
            {
                //throw new Exception("Get failed and exception thrown from server");
                System.Threading.Thread.Sleep(2000);
                List<Department> departments = db.Departments.ToList();
                response = Request.CreateResponse(HttpStatusCode.OK, departments);
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.ExpectationFailed, ex.ToString());
            }

            return response;
        }

        /// <summary>
        /// Get the details of a department by providing an Id
        /// </summary>
        /// <param name="id">The department Id</param>
        /// <returns>The department by id</returns>
        [HttpGet]
        [ActionName("GetDepartment")]
        [Route("Details/{id}")]
        public async Task<HttpResponseMessage> Get(int id)
        {
            try
            {
                System.Threading.Thread.Sleep(2000);
                Department department = await db.Departments.FindAsync(id);
                response = Request.CreateResponse(HttpStatusCode.OK, department);
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.ExpectationFailed, ex.ToString());
            }

            return response;
        }

        /// <summary>
        /// Create a department
        /// </summary>
        /// <param name="department">The department to create</param>
        /// <returns>The successfully created department</returns>
        [HttpPost]
        [Route("Create")]
        public async Task<HttpResponseMessage> CreateDepartment([FromBody]Department department)
        {
            try
            {
                System.Threading.Thread.Sleep(2000);
                db.Departments.Add(department);
                await db.SaveChangesAsync();
                response = Request.CreateResponse(HttpStatusCode.OK, department);
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.ExpectationFailed, ex.ToString());
            }

            return response;
        }

        /// <summary>
        /// Update a department
        /// </summary>
        /// <param name="department">The department to update</param>
        /// <returns>The success result of the department update. Returns true upon successful update</returns>
        [HttpPost]
        [Route("Edit")]
        public async Task<HttpResponseMessage> EditDepartment([FromBody]Department department)
        {
            try
            {
                System.Threading.Thread.Sleep(2000);
                db.Entry(department).State = EntityState.Modified;
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
        /// Delete a department
        /// </summary>
        /// <param name="id">The id of the department to delete</param>
        /// <returns>The success result of the department delete. Returns true upon successful deleteion</returns>
        [HttpPost]
        [Route("Delete/{id}")]
        public async Task<HttpResponseMessage> DeleteDepartment(int id)
        {
            try
            {
                System.Threading.Thread.Sleep(2000);
                Department department = await db.Departments.FindAsync(id);
                db.Entry(department).State = EntityState.Deleted;
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

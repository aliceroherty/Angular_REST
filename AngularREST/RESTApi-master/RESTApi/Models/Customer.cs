using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RESTApi.Models
{
    /// <summary>
    /// Customer
    /// </summary>
    public class Customer
    {
        /// <summary>
        /// Customer Id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Customer First Name
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        /// Ciustomer Last Name
        /// </summary>
        public string LastName { get; set; }

        /// <summary>
        /// Customer Social Insurance Number
        /// </summary>
        public string SSN { get; set; }
    }
}
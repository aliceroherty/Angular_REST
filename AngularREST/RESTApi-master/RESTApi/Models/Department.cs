using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RESTApi.Models
{
    /// <summary>
    /// Department
    /// </summary>
    public class Department
    {
        /// <summary>
        /// Department Id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Department Name
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Department Description
        /// </summary>
        public string Description { get; set; }
    }
}
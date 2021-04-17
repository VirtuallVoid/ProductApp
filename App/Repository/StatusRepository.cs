using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using App.Models;

namespace App.Repository
{
    public class StatusRepository
    {
        private productdbEntities DB;
        public StatusRepository()
        {
            DB = new productdbEntities();

        }

        public IEnumerable<SelectListItem> GetAllStatus()
        {
            IEnumerable<SelectListItem> obj = new List<SelectListItem>();

            obj = (from item in DB.ProductStatus
                select new SelectListItem()
                {
                    Text = item.statusName,
                    Value = item.ID.ToString(),
                    Selected = true

                }).ToList();

            return obj;
        }
    }
}
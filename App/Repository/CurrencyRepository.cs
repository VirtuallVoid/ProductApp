using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using App.Models;

namespace App.Repository
{
    public class CurrencyRepository
    {
        private productdbEntities DB;
        public CurrencyRepository()
        {
            DB = new productdbEntities();

        }

        public IEnumerable<SelectListItem> GetAllCurrency()
        {
            IEnumerable<SelectListItem> obj = new List<SelectListItem>();

            obj = (from item in DB.Currency 
                    select new SelectListItem()
                    {
                        Text = item.abbreviation,
                        Value = item.ID.ToString(),
                        Selected = true

                    }).ToList();

            return obj;
        }
    }
}
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using App.Models;

namespace App.Controllers
{
    public class ProductAddController : Controller
    {
        private productdbEntities db;

        [HttpPost]
        public JsonResult SaveProduct(string productName, string description, string price, int currencyID, int statusID )
        {
            db = new productdbEntities();
            System.Diagnostics.Debug.WriteLine("price = "+price);
            var obj = new Product()
            {
                productName = productName,
                productDescription = description,
                price = Decimal.Parse(price, CultureInfo.InvariantCulture),
                currencyID = currencyID,
                statusID = statusID
            };

            db.Product.Add(obj);
            db.SaveChanges();
            return Json(new { status = "success" }, JsonRequestBehavior.AllowGet);
        }
    }
}
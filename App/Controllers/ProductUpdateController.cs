using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using App.Models;

namespace App.Controllers
{
    public class ProductUpdateController : Controller
    {
        private productdbEntities db;

        [HttpPost]
        public JsonResult UpdateProduct(int productID, string productName, string description, string price, int currencyID, int statusID)
        {
            //System.Diagnostics.Debug.WriteLine("************* data received from front end ***************");
            db = new productdbEntities();
            var product = db.Product.First(item => item.ID.Equals(productID));
            product.productName = productName;
            product.productDescription = description;
            product.price = Decimal.Parse(price, CultureInfo.InvariantCulture);
            product.currencyID = currencyID;
            product.statusID = statusID;

            db.SaveChanges();

            return Json( new {status = "success"}, JsonRequestBehavior.AllowGet);
        }
    }
}
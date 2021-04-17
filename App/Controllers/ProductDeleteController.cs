using App.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace App.Controllers
{
    public class ProductDeleteController : Controller
    {
        private productdbEntities db;

        [HttpPost]
        public JsonResult DeleteProduct( List<int> productIDArray )
        {
            //System.Diagnostics.Debug.WriteLine(productIDArray);
            db = new productdbEntities();
            var products = db.Product.Where(item => productIDArray.Contains(item.ID));
            db.Product.RemoveRange(products);
            db.SaveChanges();

            return Json(new { status = "success" }, JsonRequestBehavior.AllowGet);
        }
    }
}
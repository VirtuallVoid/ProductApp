using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using App.Models;
using App.Repository;

namespace App.Controllers
{
    public class HomeController : Controller
    {
        private productdbEntities db;
        // GET: Home
        public ActionResult Index()
        {
            CurrencyRepository objCurrRep = new CurrencyRepository();
            StatusRepository objStatRep = new StatusRepository();

            var obj = new Tuple<IEnumerable<SelectListItem>, IEnumerable<SelectListItem>>(objCurrRep.GetAllCurrency(), objStatRep.GetAllStatus());
            return View(obj);
        }

        //To Get Data Of Table From Database
        [HttpGet]
        public JsonResult GetTblData()
        {
            //System.Diagnostics.Debug.WriteLine("************* data received from front end ***************");
            db = new productdbEntities();
            var myList = (from prod in db.Product
                        join curr in db.Currency on prod.currencyID equals curr.ID
                        join status in db.ProductStatus on prod.statusID equals status.ID
                        select new
                        {
                            productID = prod.ID,
                            prod.productName,
                            description = prod.productDescription,
                            prod.price,
                            currencyID = curr.ID,
                            currency = curr.abbreviation,
                            status = status.statusName,
                            statusID = status.ID
                        }).ToList();


            return Json(myList, JsonRequestBehavior.AllowGet);
        }
    }
}
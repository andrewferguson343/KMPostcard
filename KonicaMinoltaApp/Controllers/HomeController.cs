using System;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Web.Mvc;
using System.Collections.Generic;

namespace KonicaMinoltaApp.Controllers
{
  public class HomeController : Controller
  {
    public ActionResult Index()
    {
      if(Session["fileData"] == null)
      {
        Session["fileData"] = new List<string>();
      }
      return View();
    }

    public ActionResult SendEmail(FormCollection form)
    {
      //First, Parse data from the form
      string detectedBase64String = string.Empty;
      string originalBase64 = string.Empty;
      string detectedEmail = string.Empty;
      string filePath = string.Empty;
      if (form != null)
      {
        if (form.AllKeys.Contains("DataURL"))
        {
          detectedBase64String = form["DataURL"];
        }
        if (form.AllKeys.Contains("Email"))
        {
          detectedEmail = form["Email"];
        }
      }
      // If there is an image, format its base64 string
      if (detectedBase64String != string.Empty)
      {
        originalBase64 = detectedBase64String;
        detectedBase64String = detectedBase64String.Replace("data:image/png;base64,", "");
      }
      filePath = AppDomain.CurrentDomain.BaseDirectory + @"\\Content\\Images\\image" + DateTime.Now.ToLongTimeString().Replace(':', '-') + ".png";

      //create image attachement from base64 string
      byte[] bytes = Convert.FromBase64String(detectedBase64String);     
      using (FileStream fs = new FileStream(filePath, FileMode.Create))
      {
        using (BinaryWriter bw = new BinaryWriter(fs))
        {
          byte[] data = Convert.FromBase64String(detectedBase64String);
          bw.Write(data);
          bw.Close();
        }
      }
      try
      {
        Attachment attach = new Attachment(filePath);
        //create and populate mail message object
        MailMessage mail = new MailMessage("KMAndrewF@gmail.com", detectedEmail);
        SmtpClient client = new SmtpClient();
        client.Port = 25;
        client.DeliveryMethod = SmtpDeliveryMethod.Network;
        client.UseDefaultCredentials = false;
        client.Credentials = new System.Net.NetworkCredential("KMAndrewF@gmail.com", "KMAF9*91");
        client.EnableSsl = true;
        client.Host = "smtp.gmail.com";
        mail.Subject = "Your friend sent you a post card!";
        mail.Body = "The card is attached!";
        mail.Attachments.Add(attach);
        client.Send(mail);

        //For history, Add to session variable
        List<string> fileData = (List<string>)Session["fileData"];
        fileData.Add(originalBase64);
        Session["fileData"] = fileData;
      }

      catch (Exception e)
      {
        Console.Write("An Error Occurred");
      }
      return View("Index");
    }
  }
}
using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestProject1
{
    internal class LoginPage
    {
        IWebDriver driver;

        public LoginPage(IWebDriver webDriver)
        {
            driver = webDriver;
        }

        public IWebElement getUserNameInput()
        {
            return driver.FindElement(By.XPath("//input[@placeholder='Username']"));
        }

        public IWebElement getPasswordInput()
        {
            return driver.FindElement(By.XPath("//input[@placeholder='Password']"));
        }

        public void setUsername(String username)
        {
            getUserNameInput().Click();
            getUserNameInput().Clear();
            getUserNameInput().SendKeys(username);
        }

        public void setPassword(String password)
        {
            getPasswordInput().Click();
            getPasswordInput().Clear();
            getPasswordInput().SendKeys(password);
        }

        public IWebElement getLoginButton()
        {
            return driver.FindElement(By.XPath("//button[contains(@class,'login')]"));
        }

        public BasePage clickOnLogin()
        {
            getLoginButton().Click();
            return new BasePage(driver);
        }
    }
}

using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OpenQA.Selenium.Support.UI;

namespace TestProject1
{
    internal class BasePage
    {

        IWebDriver driver;

        public BasePage(IWebDriver webDriver)
        {
            driver = webDriver;
        }

        public IWebElement getNavbarItem(String name)
        {
            return driver.FindElement(By.XPath("//a[@href='" + name + "']"));
        }

        public RegisterUserPage clickOnRegisterUser()
        {
            getNavbarItem("/registerUser").Click();
            return new RegisterUserPage(driver);
        }

        public AddMediaPage clickOnAddMediaNavbarItem()
        {
            getNavbarItem("/media/add").Click();
            return new AddMediaPage(driver);
        }

        public IWebElement getNavbarTitle()
        {
            return driver.FindElement(By.XPath("//h2[contains(@class,'navbar-title')]"));
        }

        public String getUserName()
        {
            return driver.FindElement(By.XPath("//h3[contains(@class,'navbar-username')]")).Text.Split(", ")[1];
        }

    }

    class RegisterUserPage : BasePage
    {
        IWebDriver driver;
        public RegisterUserPage(IWebDriver webDriver) : base(webDriver)
        {
            driver = webDriver;
        }

        public IWebElement getUserNameInput()
        {
            return driver.FindElement(By.XPath("//input[@name='username']"));
        }

        public void setUserName(String name)
        {
            getUserNameInput().SendKeys(name);
        }

        public IWebElement getPasswordInput()
        {
            return driver.FindElement(By.XPath("//input[@name='password']"));
        }

        public void setPassword(String password)
        {
            getPasswordInput().SendKeys(password);
        }

        public IWebElement getNameInput()
        {
            return driver.FindElement(By.XPath("//input[@name='name']"));
        }

        public void setName(String name)
        {
            getNameInput().SendKeys(name);
        }
        public IWebElement getEmailInput()
        {
            return driver.FindElement(By.XPath("//input[@name='email']"));
        }

        public void setEmail(String email)
        {
            getEmailInput().SendKeys(email);
        }

        public IWebElement getPhoneInput()
        {
            return driver.FindElement(By.XPath("//input[@name='phoneNumber']"));
        }

        public void setPhone(String phone)
        {
            getPhoneInput().SendKeys(phone);
        }
        public IWebElement getAddressInput()
        {
            return driver.FindElement(By.XPath("//input[@name='address']"));
        }

        public void setAddress(String address)
        {
            getAddressInput().SendKeys(address);
        }

        public IWebElement getSubmitButton()
        {
            return driver.FindElement(By.XPath("//button[@type='submit']"));
        }

        public void clickOnSubmit()
        {
            getSubmitButton().Click();
            Thread.Sleep(1000);
        }

        public IWebElement getModalCloseButton()
        {
            return driver.FindElement(By.XPath("/html/body/div/div/div/div/div/div/div/div/button[2]"));
        }

        public IWebElement getModalAddMoreButton()
        {
            return driver.FindElement(By.XPath("/html/body/div/div/div/div/div/div/div/div/button[1]"));
        }

        public IWebElement getSuccessMessage()
        {
            return driver.FindElement(By.XPath("//div[contains(@class,'modal-content')]//h2"));
        }

        public ClientsPage clickOnModalCloseButton()
        {
            getModalCloseButton().Click();
            return new ClientsPage(driver);
        }

        public void clickOnModalAddMoreButton()
        {
            getModalAddMoreButton().Click();
        }

    }

    class ClientsPage : BasePage
    {
        IWebDriver driver;
        public ClientsPage(IWebDriver webDriver) : base(webDriver)
        {
            driver = webDriver;
        }

        public IWebElement getFilterNameInput()
        {
            return driver.FindElement(By.XPath("//input[@placeholder='Filter Name']"));
        }

        public void setFilterNameInput(String name)
        {
            getFilterNameInput().Click();
            getFilterNameInput().Clear();
            getFilterNameInput().SendKeys(name);
        }

        public IList<IWebElement> getClientsList()
        {
            return driver.FindElements(By.XPath("//div[contains(@class,'table')]//div[contains(@class,'table-row')]"));
        }
    }

    class AddMediaPage : BasePage
    {
        IWebDriver driver;
        public AddMediaPage(IWebDriver webDriver) : base(webDriver)
        {
            driver = webDriver;
        }

        public IWebElement getNameInput()
        {
            return driver.FindElement(By.XPath("//input[@name='name']"));
        }

        public void setName(String name)
        {
            getNameInput().Click();
            getNameInput().Clear();
            getNameInput().SendKeys(name);
        }

        public IWebElement getDescriptionInput()
        {
            return driver.FindElement(By.XPath("//input[@name='description']"));
        }

        public void setDescriptionInput(String desc)
        {
            getDescriptionInput().Click();
            getDescriptionInput().Clear();
            getDescriptionInput().SendKeys(desc);
        }

        public IWebElement getGenreInput()
        {
            return driver.FindElement(By.XPath("//input[@name='genre']"));
        }

        public void setGenreInput(String genre)
        {
            getGenreInput().Click();
            getGenreInput().Clear();
            getGenreInput().SendKeys(genre);
        }

        public IWebElement getRatingInput()
        {
            return driver.FindElement(By.XPath("//input[@name='rating']"));
        }

        public void setRatingInput(String rating)
        {
            getRatingInput().Click();
            getRatingInput().Clear();
            getRatingInput().SendKeys(rating);
        }

        public SelectElement getTypeSelector()
        {
            return new SelectElement(driver.FindElement(By.XPath("//select[@name='type']")));
        }

        public void setTypeSelector(String type)
        {
            getTypeSelector().SelectByText(type);
        }

        public IWebElement getDurationInput()
        {
            return driver.FindElement(By.XPath("//input[@name='duration']"));
        }

        public void setDurationInput(String dur)
        {
            getDurationInput().Click();
            getDurationInput().Clear();
            getDurationInput().SendKeys(dur);
        }

        public IWebElement getStockInput()
        {
            return driver.FindElement(By.XPath("//input[@name='stock']"));
        }

        public void setStockInput(String stock)
        {
            getStockInput().Click();
            getStockInput().Clear();
            getStockInput().SendKeys(stock);
        }

        public IWebElement getSubmitButton()
        {
            return driver.FindElement(By.XPath("//button[@type='submit']"));
        }

        public void clickOnSubmit()
        {
            getSubmitButton().Click();
            Thread.Sleep(1000);
        }

        public IWebElement getSuccessMessage()
        {
            return driver.FindElement(By.XPath("//div[contains(@class,'modal-content')]//h2"));
        }

        public IWebElement getModalCloseButton()
        {
            return driver.FindElement(By.XPath("/html/body/div/div/div/div/div/div/div/div/button[2]"));
        }

        public IWebElement getModalAddMoreButton()
        {
            return driver.FindElement(By.XPath("/html/body/div/div/div/div/div/div/div/div/button[1]"));
        }

        public MediasPage clickOnModalCloseButton()
        {
            getModalCloseButton().Click();
            return new MediasPage(driver);
        }

        public void clickOnModalMoreButton()
        {
            getModalAddMoreButton().Click();
        }
    }
    class MediasPage : BasePage
    {
        IWebDriver driver;
        public MediasPage(IWebDriver webDriver) : base(webDriver)
        {
            driver = webDriver;
        }

        public IWebElement getFilterNameInput()
        {
            return driver.FindElement(By.XPath("//input[@placeholder='Filter Name']"));
        }

        public void setFilterNameInput(String name)
        {
            getFilterNameInput().Click();
            getFilterNameInput().Clear();
            getFilterNameInput().SendKeys(name);
        }

        public IList<IWebElement> getMediasList()
        {
            return driver.FindElements(By.XPath("//div[contains(@class,'table')]//div[contains(@class,'table-row')]"));
        }
    }
}

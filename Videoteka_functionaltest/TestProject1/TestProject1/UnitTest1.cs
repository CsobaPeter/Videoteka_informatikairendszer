using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using TestProject1;

namespace VideotekaFunctionalTest
{
    public class Tests
    {
        [SetUp]
        public void Setup()
        {

        }

        [Test]
        public void testLogin()
        {
            String userName = "a";
            String password = "a";

            IWebDriver webDriver = new ChromeDriver();
            webDriver.Navigate().GoToUrl("http://localhost:3000");
            webDriver.Manage().Window.Maximize();
            LoginPage loginPage = new LoginPage(webDriver);
            loginPage.setUsername(userName);
            loginPage.setPassword(password);
            BasePage basePage = loginPage.clickOnLogin();
            Assert.IsTrue(basePage.getNavbarTitle().Displayed);
            Assert.IsTrue(basePage.getUserName() == userName);
            webDriver.Quit();
        }

        [Test]
        public void testAddClient()
        {
            String userName = "a";
            String password = "a";
            String clientName = "client";
            String clientEmail = "client@test.com";
            String clientPhone = "123456789";
            String clientAddress = "Somewhere 12";

            IWebDriver webDriver = new ChromeDriver();
            webDriver.Navigate().GoToUrl("http://localhost:3000");
            webDriver.Manage().Window.Maximize();
            LoginPage loginPage = new LoginPage(webDriver);
            loginPage.setUsername(userName);
            loginPage.setPassword(password);
            BasePage basePage = loginPage.clickOnLogin();
            Assert.IsTrue(basePage.getNavbarTitle().Displayed);
            Assert.IsTrue(basePage.getUserName() == userName);
            AddClientPage addClientPage = basePage.clickOnAddClientNavbarItem();
            addClientPage.setName(clientName);
            addClientPage.setEmail(clientEmail);
            addClientPage.setPhone(clientPhone);
            addClientPage.setAddress(clientAddress);
            addClientPage.setSelectUser(userName);
            addClientPage.clickOnUserLink(userName);
            addClientPage.clickOnSubmit();
            Assert.IsTrue(addClientPage.getSuccessMessage().Displayed);
            webDriver.Quit();
        }

        [Test]
        public void testClientFilterByName()
        {
            String userName = "a";
            String password = "a";
            String clientName = "client";
            String clientEmail = "client@test.com";
            String clientPhone = "123456789";
            String clientAddress = "Somewhere 12";
            String client2Name = "client2";
            String client2Email = "client2@test.com";
            String client2Phone = "987654321";
            String client2Address = "Nowhere 13";

            IWebDriver webDriver = new ChromeDriver();
            webDriver.Navigate().GoToUrl("http://localhost:3000");
            webDriver.Manage().Window.Maximize();
            LoginPage loginPage = new LoginPage(webDriver);
            loginPage.setUsername(userName);
            loginPage.setPassword(password);
            BasePage basePage = loginPage.clickOnLogin();
            Assert.IsTrue(basePage.getNavbarTitle().Displayed);
            Assert.IsTrue(basePage.getUserName() == userName);
            AddClientPage addClientPage = basePage.clickOnAddClientNavbarItem();
            addClientPage.setName(clientName);
            addClientPage.setEmail(clientEmail);
            addClientPage.setPhone(clientPhone);
            addClientPage.setAddress(clientAddress);
            addClientPage.setSelectUser(userName);
            addClientPage.clickOnUserLink(userName);
            addClientPage.clickOnSubmit();
            addClientPage.clickOnModalAddMoreButton();

            addClientPage.setName(client2Name);
            addClientPage.setEmail(client2Email);
            addClientPage.setPhone(client2Phone);
            addClientPage.setAddress(client2Address);
            addClientPage.setSelectUser(userName);
            addClientPage.clickOnUserLink(userName);
            addClientPage.clickOnSubmit();
            ClientsPage clientsPage = addClientPage.clickOnModalCloseButton();
            clientsPage.setFilterNameInput(client2Name);
            Assert.IsTrue(clientsPage.getClientsList().Count() == 1);
            webDriver.Quit();
        }

        [Test]
        public void testAddMedia()
        {
            String userName = "a";
            String password = "a";
            String title = "The Godfather";
            String desc = "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.";
            String genre = "Crime, Drama";
            String rating = "9";
            String type = "DVD";
            String duration = "175";
            String stock = "10";

            IWebDriver webDriver = new ChromeDriver();
            webDriver.Navigate().GoToUrl("http://localhost:3000");
            webDriver.Manage().Window.Maximize();
            LoginPage loginPage = new LoginPage(webDriver);
            loginPage.setUsername(userName);
            loginPage.setPassword(password);
            BasePage basePage = loginPage.clickOnLogin();
            Assert.IsTrue(basePage.getNavbarTitle().Displayed);
            Assert.IsTrue(basePage.getUserName() == userName);
            AddMediaPage addMediaPage = basePage.clickOnAddMediaNavbarItem();
            addMediaPage.setName(title);
            addMediaPage.setDescriptionInput(desc);
            addMediaPage.setGenreInput(genre);
            addMediaPage.setRatingInput(rating);
            addMediaPage.setDurationInput(duration);
            addMediaPage.setStockInput(stock);
            addMediaPage.clickOnSubmit();
            Assert.IsTrue(addMediaPage.getSuccessMessage().Displayed);
            webDriver.Quit();
        }

        [Test]
        public void testFilterMediaByName()
        {
            String userName = "a";
            String password = "a";
            String title = "The Godfather";
            String desc = "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.";
            String genre = "Crime, Drama";
            String rating = "9";
            String type = "DVD";
            String duration = "175";
            String stock = "10";

            String title2 = "The Dark Knight";
            String desc2 = "When a menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman, James Gordon and Harvey Dent must work together to put an end to the madness.";
            String genre2 = "Crime, Drama, Thriller";
            String rating2 = "9";
            String type2 = "VHS";
            String duration2 = "152";
            String stock2 = "5";

            IWebDriver webDriver = new ChromeDriver();
            webDriver.Navigate().GoToUrl("http://localhost:3000");
            webDriver.Manage().Window.Maximize();
            LoginPage loginPage = new LoginPage(webDriver);
            loginPage.setUsername(userName);
            loginPage.setPassword(password);
            BasePage basePage = loginPage.clickOnLogin();
            Assert.IsTrue(basePage.getNavbarTitle().Displayed);
            Assert.IsTrue(basePage.getUserName() == userName);
            AddMediaPage addMediaPage = basePage.clickOnAddMediaNavbarItem();
            addMediaPage.setName(title);
            addMediaPage.setDescriptionInput(desc);
            addMediaPage.setGenreInput(genre);
            addMediaPage.setRatingInput(rating);
            addMediaPage.setDurationInput(duration);
            addMediaPage.setStockInput(stock);
            addMediaPage.clickOnSubmit();
            addMediaPage.clickOnModalMoreButton();

            addMediaPage.setName(title2);
            addMediaPage.setDescriptionInput(desc2);
            addMediaPage.setGenreInput(genre2);
            addMediaPage.setRatingInput(rating2);
            addMediaPage.setDurationInput(duration2);
            addMediaPage.setStockInput(stock2);
            addMediaPage.clickOnSubmit();
            MediasPage mediasPage = addMediaPage.clickOnModalCloseButton();
            mediasPage.setFilterNameInput(title2);
            Assert.IsTrue(mediasPage.getMediasList().Count == 1);
            webDriver.Quit();
        }
    }
}
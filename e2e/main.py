from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
import time

service = Service(executable_path=ChromeDriverManager().install())
driver = webdriver.Chrome(service=service)
errors: list = []

driver.get("https://staging.guitar0.net/")

# Button "Начать обучение"
driver.find_elements("class name", "shrink-0")[0].click()
url = driver.current_url
assert url == "https://staging.guitar0.net/courses", "URL error: button 'Начать обучение' doesn't lead to https://staging.guitar0.net/courses"

driver.get("https://staging.guitar0.net/")

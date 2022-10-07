# To Write Up...

from locust import HttpUser, task

class LoadTest(HttpUser):
    @task
    def get_authentified_page(self):
        res = self.client.get(f"/account/authentified")
        print(res.content)
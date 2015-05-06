## Golang

Below a small code sample to authenticate and retrieve data about an
application on wercker in golang.

```golang
package main

import (
    "log"
    "net/http"
)

func main() {
    url := "https://app.wercker.com/api/v3/applications/wercker/docs"
    client := &http.Client{}
    req, _ := http.NewRequest("GET", url, nil)
    req.Header.Add("Authorization", "Bearer <TOKEN>")
    resp, err := client.Do(req)
    if err != nil {
        log.Println(err)
    }
    log.Println(resp)
    defer resp.Body.Close()
}
```

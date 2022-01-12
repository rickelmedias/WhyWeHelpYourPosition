Install the yarn

```bash
    npm install --global yarn
```

Install all dependencies

```bash
    yarn install
```

Configure the `.env` file with your `https://mailtrap.io/` user and password.

```env
    MAIL_USER=myUser123
    MAIL_PASS=myPass123
```

If you are using the port 3334, you can change it in the `server.ts` file.
Now just run the server:

```
    yarn start
```

To test the API, we need do a POST method in the endpoint `http://localhost:3334/findme`

```json
    {
        "name": "Rick",
        "email": "rickddev@gmail.com",
        "first_keyword": "Compras",
        "second_keyword": "Funko",
        "website_url": "funko.pop"
    }
```

This API will send an e-mail to MailTrap with your position on google searching, this API basically find by your website using 2 keywords.
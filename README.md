I like Zaytung, but I don't like to click through every item in "Son Dakika" pages. So I wrote this: it allows you to read "Son Dakika" feed from your terminal, like real developers would.

Usage is simple, just run:

    node app.js

It will get you the latest item and you can hit <Enter> to see the next one.

If you like to read in chunks (like real developers would):

    node app.js 10

And it will get you the latest 10 items, and you can hit <Enter> to see the next 10.


If you like to write to a file or a pipe (like real developers... oh okay, nevermind):

    node app.js > news.txt
    node app.js 100 > news100.txt

It will write them there and it will give you the nicest progress indicator. ("Wrote n/m")

That's it.

If you find bugs, or you think you can make it cooler, send a PR. I love PRs.


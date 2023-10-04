# BlogApi

The biggest issue encountered during this project is fixing the issue where passportJS serializes, but doesn't deserialize or redirect. Since I couldn't find a quick fix, I had to dig through documentation and thoroughly understand how
passportJS and cors worked. I figured out the solution by tinkering around with various cors options and fetch request options.

Related to the issue above is figuring out why successRedirect and failureRedirect didn't work. I verified that
passport authenticate was being called and serialize + deserializeUser were successful, but redirects weren't happening.
My current hypothesis is that it has something to do with redirects not working with fetch requests. I figured out a quicker workaround as demonstrated in my code, but it seems to come with slower performance.

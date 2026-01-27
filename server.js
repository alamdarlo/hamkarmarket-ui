import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'
 
const port = process.env.PORT || '3000'
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
 

// var options = {
//     key: fs.readFileSync('ssl.key'),
//     cert: fs.readFileSync('ssl.crt'),
//     ca: [fs.readFileSync('root.crt')]
// };

app.prepare().then(() => {
  console.log("dev:"+dev);
  console.log("port:"+port);

  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(port)
 
  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? 'development' : process.env.NODE_ENV
    }`
  )
})
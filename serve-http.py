#!/usr/bin/env python

import http.server
import socketserver
import argparse

class MyHttpRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.endswith('.mjs'):
            self.send_response(200)
            self.send_header('Content-type', 'application/javascript')
            self.end_headers()
            with open(self.path[1:], 'rb') as file:
                self.wfile.write(file.read())
        else:
            super().do_GET()

Handler = MyHttpRequestHandler

parser = argparse.ArgumentParser()
parser.add_argument('port', type=int, help="The port to serve the web pages on")
args = parser.parse_args()

with socketserver.TCPServer(("", args.port), Handler) as httpd:
    print(f"Serving at port {args.port}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("Terminating...")

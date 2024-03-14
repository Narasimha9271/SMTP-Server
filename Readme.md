# Types Of Servers

### SMTP

-   Simple Mail Transfer Protocol
-   Receives outgoing mail from email client
-   and routes to appropiate destination server.
-   these servers can handle authentication, encryption and spam filtering.
-   smtp -> port 25
-   smtps -> port 465

### HTTP

-   Hyper Text Transfer Protocol
-   Stores and serves web pages and other resources to clients that request them.
-   It is a data exchange on the Web
-   it is a client-server protocol, which means requests are initiated by the recipient, usually the Web browser.
-   handle cookies, caching, sessions, security feautures like HTTPS.
-   http -> port 80
-   https -> port 443

### FTP

-   File Transfer Protocol
-   Transfers files between a client and server on a computer network.
-   Used for uploading/downloading files ona remote server
-   can support secure connections via protocols like FTPS(FTP Secure) or SFTP (SSH FTP)

### DNS

-   Domain Name System.
-   Translates domain names to IP addresses and vice versa so browsers can load internet resources.
-   can cache queries to improve performance.
-   can implement security measures like DNSSEC(DNS Security Extensions).

### GRPC

-   Google Remote Procedure Call
-   high performant RPC framework developed by Google
-   uses HTTP/2 for transport, Protocol Buffers as the interface description language.
-   this server exposes services and methods that clients can call remotely => enabling efficient communication between distributed systems.
-   supports bidirectional streaming, authentication, load balancing.

## How to send mail

**SEND FROM** narasimha.in@gmail.com
**SEND TO** support@outlook.com

1. Make DNS Query on outlook.com -> I want **MX Record**(Mail Exchange) from outlook => response as mailserver.com
2. Again do DNS Query on mailserver.com to get **A record**(IP Address) => response as 1.2.3.4
3. using this IP address we can send email

**DKIM Record**

-   Domain Key Identified Mail
-   2 keys for assymmetric crytography => public key(for encryption) , private key(for decryption)
-   It's an email authentication method designed to detect email spoofing and phishing.
-   It checks that email came is from original user or not using signature.
-   DKIM works by adding a digital signature to the header of an outgoing email message.
-   This signature is generated using a private key associated with the sending domain.
-   The receiving mail server can then use the public key published in the sending domain's DNS records to verify the authenticity of the signature.

**DMARC Record**

-   Domain-based Message Authentication, Reporting, and Conformance.
-   It tells you what to do if the above check of DKIM/SPF(sender policy framework) failed => means user sending main is a spammer
-   if value is None => Accept and send it to inbox ---> Not a good way
-   if value is Quarantine => Send it to spam folder
-   if value is Reject => Don't accept the mail

## Building oir own mail server -> SMTP server

1. install `smtp-server` package

#### SMTP Commands

1. EHLO/HELO: Initiates the SMTP session and identifies the sending client to the receiving server.

```
EHLO example.com
```

2. MAIL FROM: Specifies the sender's email address.

```
MAIL FROM: <sender@example.com>
```

3. RCPT TO: Specifies the recipient's email address.

```
RCPT TO: <recipient@example.com>
```

4. DATA -> start of msg data section
5. Subject: This is the subject of the email

```
Subject: This is the subject of the email
```

6. From: Specifies the sender's email address.

```
From: sender@example.com
```

7. To: Specifies the recipient's email address.

```
To: recipient@example.com
```

8. Body: Contains the body of the email message.

```
Hello,

This is the body of the email.

Regards,
Sender
```

9. . -> end of msg
10. QUIT -> terminates SMTP Session

-   All above cmds defines a particular function within SMTP Session -> consists of 3 steps

1. handshake -> establishing a TCP connection
2. email tranfer -> manipulates with the email
3. termination -> closing a TCP connection

## SMTP Response codes

-   101 -> server connection error
-   220 -> server is ready
-   235 -> Authentication successful
-   250 -> request is ok
-   354 -> start mail input
-   421 -> service not available
-   450 -> mailbox unavailable
-   451 -> local error
-   452 -> insufficient storage
-   500 -> syntax error

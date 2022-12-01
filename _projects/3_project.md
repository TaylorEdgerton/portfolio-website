---
layout: page
title: Web Chat App
description: A web chat app utilising Nodejs backend, and Angular front end frameworks.
img: assets/img/chatapp_ss4.png
importance: 3

---

I was required to create a web chat app using Angular front and a Nodejs server back end. Requirements included the use of Socket.io modules and connections, express modules and REST apis for communication between client and server sides of the application. 
The application would contain groups and channels where clients can communicate with each other. Mongodb was used for object oriented database queries access and storage of user and chat information. Different privileges were also required for Admin users. Unit testing was also required using chaiJS.

This project was my introduction to designing and implementing server side functionality which communicates with the client side using RESTful apis. This was also further demonstration for the use of reading documentation to implement frameworks such as Nodejs, sockets and express to solve a problem. 


The project source files can be found [HERE](https://github.com/TaylorEdgerton/chat-app)

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/chatapp_ss1.png" title="Chat app screenshot1" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/chatapp_ss2.png" title="Chat app screenshot2" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/chatapp_ss3.png" title="Chat app screenshot3" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Login, User and Admin chat pages, Admin having an Admin and Add new user components. Profile pictures are selected and changed by clicking the profile picture on the top left of the screen
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/chatapp_ss8.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The Chat box containing sent and recieved messages and information.
</div>

The chat and channel user display area showing sent messages that are saved to the mongodb database, and returned for each channel the user is joined, as selected.


<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/chatapp_ss5.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/chatapp_ss6.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    User selecting a Group or Channel from the dropdown menus
</div>


<div style="float:left;">
    <a href="/projects/2_project">PREVIOUS PROJECT</a>
</div>
<div style="float:right;">
    <a href="/projects/4_project">NEXT PROJECT</a>
</div>

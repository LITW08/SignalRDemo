# SignalRDemo

To get started with SignalR, create a class in the root of the application that inherits from Hub. Here's a sample:

https://github.com/LITW08/SignalRDemo/blob/master/SignalRDemo/ChatHub.cs#L20

You'll then need to make sure to add the two following lines in the `Startup.cs` class:

https://github.com/LITW08/SignalRDemo/blob/master/SignalRDemo/Startup.cs#L24

https://github.com/LITW08/SignalRDemo/blob/master/SignalRDemo/Startup.cs#L54 (on this line you don't have to use `/chat`, you can use any URL you want)

Then, install the following npm package in your client app:

`npm install @microsoft/signalr`

Some additional notes: 

To use SignalR outside of the hub: https://github.com/LITW08/SignalRDemo/blob/master/SignalRDemo/Controllers/SampleController.cs#L15-L28

To get the currently logged in user in the Hub: https://github.com/LITW08/SignalRDemo/blob/master/SignalRDemo/ChatHub.cs#L40

To get the connection string in the hub: https://github.com/LITW08/SignalRDemo/blob/master/SignalRDemo/ChatHub.cs#L26-L29

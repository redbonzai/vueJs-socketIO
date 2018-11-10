@extends('layouts.app')

@section('content')

<div class="container">
    <div class="row">

        <div class="offset-4 col-4 offset-sm-3 col-sm-6 ">
            <li class="list-group-item active">Chat Room
                <span class="badge badge-pill badge-warning">@{{ numberOfUsers }}</span>
            </li>
            <div class="badge badge-pill badge-primary">@{{ typing }}</div>
            <ul class="list-group chat-message-container" v-chat-scroll>
                <message
                v-for= "message,index in chat.messages"
                :key = "message.index"
                :color = chat.color[index]
                :user = chat.user[index]
                :time = chat.time[index]
                >@{{ message }}</message>

            </ul>
            <input type="text" class="form-control" placeholder="Type your message here ..." v-model="message" @keyup.enter='send' />

        </div>

    </div>
</div>
@endsection

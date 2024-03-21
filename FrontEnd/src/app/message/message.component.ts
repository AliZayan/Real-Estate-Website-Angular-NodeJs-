import { Component, OnInit } from '@angular/core';
import { GetCurrentUserService } from '../get-current-user.service';
import { SearchService } from '../search.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  token = localStorage.getItem('admin-accessToken');
  persons = [];
  chatWithPersonNow;
  list: any = [];
  currentUserId;
  checked:boolean=false;
  userId;
  userName;
  userProfileImage;
  meAsPersone = {
    id: 0,
    name: 'me',
    imgSrc:
      'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg',
    messageToSend: '',
    lastMessage:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  };

  constructor(
    private SearchService: SearchService,
    private GetCurrentUserService: GetCurrentUserService
  ) {}
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
  getTokenInformation() {
    const token = localStorage.getItem('admin-accessToken');
    const tokenInfo = this.getDecodedAccessToken(token); // decode token
    this.currentUserId = tokenInfo.userId;
  }

  ngOnInit(): void {
    this.getTokenInformation();
    this.getlist();
    this.getlist();
    this.persons = [
      {
        id: 12,
        name: 'Luis Yankee',
        imgSrc: 'https://www.nicesnippets.com/demo/man01.png',
      },
      {
        id: 13,
        name: 'Joi Chak',
        imgSrc:
          'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg',
      },
      {
        id: 14,
        name: 'Lajy Ion',
        imgSrc: 'https://www.nicesnippets.com/demo/man03.png',
      },
    ];
  }
  sendMessage(message) {
    if (message.value != '') {
      this.SearchService.sendMessage(message.value, this.userId).subscribe(
        (res) => {
          this.getChat(this.userId);
          message.value = null;
        }
      );
    }
  }
  getChat(id) {
      this.userId = id;
      console.log(this.userId)
      if(this.userId>0){
         this.chatWithPerson(id);
         this.checked=true;
      }
      else{
        this.checked=false;

      }

  }
  chatWithPerson(id) {
    this.SearchService.getchat(id).subscribe((res: any) => {
      this.list = res.data;
      console.log(this.list);
      let xxx = this.list.map((x) => {
        x.receiver_profile_image_url =
          'http://localhost:5000/file/download?image_path=' +
          x.receiver_profile_image_url;
        x.sender_profile_image_url =
          'http://localhost:5000/file/download?image_path=' +
          x.sender_profile_image_url;
        return x;
      });

      var msg = this.list[0];
      if (msg.receiver_id == this.userId) {
        this.userName = msg.receiver_first_name + ' ' + msg.receiver_last_name;
        this.userProfileImage = msg.receiver_profile_image_url;
      } else if (msg.sender_id == this.userId) {
        this.userName = msg.sender_first_name + ' ' + msg.sender_last_name;
        this.userProfileImage = msg.sender_profile_image_url;
      }
      console.log(this.list);
      console.log('userName: ',this.userName );
      console.log('userId: ',this.userId );
    });
  }
  getlist() {
    this.SearchService.getChatList().subscribe((res: any) => {
      var arr = res.data;
      this.persons = arr.map((x) => {
        if (this.currentUserId === x.sender_id) {
          return {
            id: x.receiver_id,
            full_name: x.receiver_first_name + ' ' + x.receiver_last_name,
            profile_image: 'http://localhost:5000/file/download?image_path=' + x.receiver_profile_image_url,
          };
        } else {
          return {
            id: x.sender_id,
            full_name: x.sender_first_name + ' ' + x.sender_last_name,
            profile_image: 'http://localhost:5000/file/download?image_path=' + x.sender_profile_image_url,
          };
        }
      });
    });
  }
}

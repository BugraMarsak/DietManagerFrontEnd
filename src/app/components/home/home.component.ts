import { TokenClaim } from './../../services/tokenclaim.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {
  userId:number;
  constructor(private tokenClaim:TokenClaim) { }

  ngOnInit(): void {
    this.userId = this.tokenClaim.getid();
    
    
  }
  item:string[][]=[
    ["Lorem ipsum","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."]
    ,["Viverra ipsum","Sit amet facilisis magna etiam tempor. Viverra ipsum nunc aliquet bibendum enim facilisis gravida neque convallis. Vel facilisis volutpat est velit egestas dui id. Tellus in metus vulputate eu scelerisque felis. Ut sem viverra aliquet eget sit amet tellus cras. Ornare arcu odio ut sem nulla pharetra. Sed elementum tempus egestas sed sed risus pretium. Arcu non sodales neque sodales ut etiam sit amet. Pellentesque sit amet porttitor eget dolor morbi non."],
    ["Risus at ultrices","Eu tincidunt tortor aliquam nulla facilisi cras. Enim tortor at auctor urna. Risus at ultrices mi tempus imperdiet nulla malesuada pellentesque elit. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel. Enim nulla aliquet porttitor lacus. Molestie nunc non blandit massa enim. Vel facilisis volutpat est velit egestas dui."],
    ["Varius quam quisque","Mi eget mauris pharetra et ultrices neque ornare. Sit amet volutpat consequat mauris nunc. Aenean pharetra magna ac placerat vestibulum lectus. Varius quam quisque id diam vel quam. Nec feugiat in fermentum posuere urna. Leo duis ut diam quam nulla porttitor massa. Sapien nec sagittis aliquam malesuada bibendum. Est sit amet facilisis magna etiam. Dignissim sodales ut eu sem integer. "],
    ["Leo vel fringilla ","Ultrices tincidunt arcu non sodales neque sodales ut etiam. Lorem dolor sed viverra ipsum nunc aliquet bibendum enim facilisis. Proin sagittis nisl rhoncus mattis rhoncus urna neque viverra. Metus dictum at tempor commodo ullamcorper a. Faucibus purus in massa tempor nec feugiat nisl pretium fusce. Leo vel fringilla est ullamcorper. Tristique senectus et netus et malesuada fames. "],
    ["In arcu cursus"," In arcu cursus euismod quis viverra nibh. Ipsum nunc aliquet bibendum enim facilisis. Vitae suscipit tellus mauris a diam. Quam nulla porttitor massa id neque aliquam vestibulum morbi blandit. Tellus in hac habitasse platea dictumst vestibulum rhoncus est pellentesque. A pellentesque sit amet porttitor eget dolor morbi non."]
  ]

}

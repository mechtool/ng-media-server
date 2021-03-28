import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
declare const MediaRecorder, flvjs ;

@Component({
  selector: 'app-media-server',
  templateUrl: './media-server.component.html',
  styleUrls: ['./media-server.component.css']
})
export class MediaServerComponent implements OnInit {
  constructor() { }
   @ViewChild('vv', {read : ElementRef}) public vv : ElementRef;
   
  onStartVideo(){
	if (flvjs.isSupported()) {
	    var flvPlayer = flvjs.createPlayer({
		type: 'flv',
		url:'http://127.0.0.1:7000/life/111.flv'
	    });
	    flvPlayer.attachMediaElement(this.vv.nativeElement);
	    flvPlayer.load();
	    flvPlayer.play();
	}
    }
    onStartTranslation(){
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
             navigator.mediaDevices.getUserMedia (
                {
                    audio: true,
                    video : true,
                }).then(  stream => {

                let url = window.location.origin.replace('http', 'ws');
                const ws = new WebSocket(url + '/');
                ws.addEventListener('open', (e) => {
                    console.log('WebSocket Open', e);
                });
                ws.addEventListener('close', (e) => {
                    ws.close();
                    console.log('WebSocket Close', e);
                });
                const mediaRecorder = new MediaRecorder(stream, {
                     mimeType: 'video/webm;codecs=h264',
                     videoBitsPerSecond: 3 * 1024 * 1024
                 });

                 mediaRecorder.start(1000); // Start recording, and dump data every second
                 mediaRecorder.addEventListener('dataavailable', (e) => {
                   ws.send(e.data);
                });
                mediaRecorder.addEventListener('stop', ()=> {
                   ws.close.bind(ws);
                });

            }).catch(function(err) {
                    console.log('The following getUserMedia error occured: ' + err);
                }
            );
        } else {
            console.log('getUserMedia not supported on your browser!');
        }
    }

  ngOnInit(): void {

  }

}

import { Component, OnInit } from '@angular/core';
declare const MediaRecorder ;

@Component({
  selector: 'app-media-server',
  templateUrl: './media-server.component.html',
  styleUrls: ['./media-server.component.css']
})
export class MediaServerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia (
          {
            audio: true,
            video : true,
          }).then(function(stream) {

          let url = window.location.origin.replace('http', 'ws');
          const ws = new WebSocket(url + '/');

          ws.addEventListener('open', (e) => {
            console.log('WebSocket Open', e);
          });
          ws.addEventListener('close', (e) => {
            console.log('WebSocket Close', e);
          });

          const mediaRecorder = MediaRecorder(stream, {
              mimeType: 'video/webm;codecs=h264',
              videoBitsPerSecond: 3 * 1024 * 1024
        });
              mediaRecorder.addEventListener('dataavailable', (e) => {
                ws.send(e.data);
              });
              mediaRecorder.addEventListener('stop', ws.close.bind(ws));
              mediaRecorder.start(1000); // Start recording, and dump data every second

        }).catch(function(err) {
                console.log('The following getUserMedia error occured: ' + err);
              }
          );
    } else {
      console.log('getUserMedia not supported on your browser!');
    }
  }

}

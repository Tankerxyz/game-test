import React, { useEffect, Suspense, useState } from 'react'
// import { Canvas } from '@react-three/fiber'
// import { PerspectiveCamera, Stats } from '@react-three/drei'
// import Lighting from './Environment/Lighting'
// import Ground from './Environment/Ground'
// import Forest from './Environment/Forest'
// import Loader from './Components/Loader'
// import RemotePlayers from './Players/RemotePlayers'
// import LocalPlayer from './Players/LocalPlayer'
// import useUserStore from './State/userStore'
// import { decode } from '@msgpack/msgpack'
// import { PlayerAudioConnection } from './Components/PlayerAudioConnection'
// import OverlayUIWrapper from './Components/OverlayUIWrapper'
// import useSceneryStore from './State/SceneryStore'

// const protocol = window.location.protocol.includes('https') ? 'wss' : 'ws'
// const socket = new WebSocket(`${protocol}://${location.host}`)

// socket.binaryType = 'arraybuffer'

// interface WebSocketMessage {
//    type: string
//    payload: any
// }

const App: React.FC = () => {
   // const setClientId = useUserStore((state) => state.setClientId)
   // const setLargeScenery = useSceneryStore((state) => state.setLargeScenery)
   // const setSmallScenery = useSceneryStore((state) => state.setSmallScenery)

   // useEffect(() => {
   //    socket.addEventListener('message', (event) => {
   //       const message = decode(event.data) as WebSocketMessage

   //       if (message.type === 'largeScenery') {
   //          setLargeScenery(message.payload)
   //       }

   //       if (message.type === 'smallScenery') {
   //          setSmallScenery(message.payload)
   //       }

   //       if (message.type === 'clientId') {
   //          setClientId(message.payload)
   //       }
   //    })

   //    socket.addEventListener('error', (event) => {
   //       console.error('WebSocket error:', event)
   //    })

   //    return () => {
   //       socket.close()
   //    }
   // }, [])

   // Adds an entry to the event log on the page, optionally applying a specified
// CSS class.

let currentTransport, streamNumber, currentTransportDatagramWriter;

// // "Connect" button handler.
// async function connect() {
//   const url = document.getElementById('url').value;
//   try {
//     var transport = new WebTransport(url);
//     addToEventLog('Initiating connection...');
//   } catch (e) {
//     addToEventLog('Failed to create connection object. ' + e, 'error');
//     return;
//   }

//   try {
//     await transport.ready;
//     addToEventLog('Connection ready.');
//   } catch (e) {
//     addToEventLog('Connection failed. ' + e, 'error');
//     return;
//   }

//   transport.closed
//       .then(() => {
//         addToEventLog('Connection closed normally.');
//       })
//       .catch(() => {
//         addToEventLog('Connection closed abruptly.', 'error');
//       });

//   currentTransport = transport;
//   streamNumber = 1;
//   try {
//     currentTransportDatagramWriter = transport.datagrams.writable.getWriter();
//     addToEventLog('Datagram writer ready.');
//   } catch (e) {
//     addToEventLog('Sending datagrams not supported: ' + e, 'error');
//     return;
//   }
//   readDatagrams(transport);
//   acceptUnidirectionalStreams(transport);
//   document.forms.sending.elements.send.disabled = false;
//   document.getElementById('connect').disabled = true;
// }

// // "Send data" button handler.
// async function sendData() {
//   let form = document.forms.sending.elements;
//   let encoder = new TextEncoder('utf-8');
//   let rawData = sending.data.value;
//   let data = encoder.encode(rawData);
//   let transport = currentTransport;
//   try {
//     switch (form.sendtype.value) {
//       case 'datagram':
//         await currentTransportDatagramWriter.write(data);
//         addToEventLog('Sent datagram: ' + rawData);
//         break;
//       case 'unidi': {
//         let stream = await transport.createUnidirectionalStream();
//         let writer = stream.getWriter();
//         await writer.write(data);
//         await writer.close();
//         addToEventLog('Sent a unidirectional stream with data: ' + rawData);
//         break;
//       }
//       case 'bidi': {
//         let stream = await transport.createBidirectionalStream();
//         let number = streamNumber++;
//         readFromIncomingStream(stream, number);

//         let writer = stream.writable.getWriter();
//         await writer.write(data);
//         await writer.close();
//         addToEventLog(
//             'Opened bidirectional stream #' + number +
//             ' with data: ' + rawData);
//         break;
//       }
//     }
//   } catch (e) {
//     addToEventLog('Error while sending data: ' + e, 'error');
//   }
// }

// // Reads datagrams from |transport| into the event log until EOF is reached.
// async function readDatagrams(transport) {
//   try {
//     var reader = transport.datagrams.readable.getReader();
//     addToEventLog('Datagram reader ready.');
//   } catch (e) {
//     addToEventLog('Receiving datagrams not supported: ' + e, 'error');
//     return;
//   }
//   let decoder = new TextDecoder('utf-8');
//   try {
//     while (true) {
//       const { value, done } = await reader.read();
//       if (done) {
//         addToEventLog('Done reading datagrams!');
//         return;
//       }
//       let data = decoder.decode(value);
//       addToEventLog('Datagram received: ' + data);
//     }
//   } catch (e) {
//     addToEventLog('Error while reading datagrams: ' + e, 'error');
//   }
// }

// async function acceptUnidirectionalStreams(transport) {
//   let reader = transport.incomingUnidirectionalStreams.getReader();
//   try {
//     while (true) {
//       const { value, done } = await reader.read();
//       if (done) {
//         addToEventLog('Done accepting unidirectional streams!');
//         return;
//       }
//       let stream = value;
//       let number = streamNumber++;
//       addToEventLog('New incoming unidirectional stream #' + number);
//       readFromIncomingStream(stream, number);
//     }
//   } catch (e) {
//     addToEventLog('Error while accepting streams: ' + e, 'error');
//   }
// }

// async function readFromIncomingStream(stream, number) {
//   let decoder = new TextDecoderStream('utf-8');
//   let reader = stream.pipeThrough(decoder).getReader();
//   try {
//     while (true) {
//       const { value, done } = await reader.read();
//       if (done) {
//         addToEventLog('Stream #' + number + ' closed');
//         return;
//       }
//       let data = value;
//       addToEventLog('Received data on stream #' + number + ': ' + data);
//     }
//   } catch (e) {
//     addToEventLog(
//         'Error while reading from stream #' + number + ': ' + e, 'error');
//     addToEventLog('    ' + e.message);
//   }
// }

// function addToEventLog(text, severity = 'info') {
//   let log = document.getElementById('event-log');
//   let mostRecentEntry = log.lastElementChild;
//   let entry = document.createElement('li');
//   entry.innerText = text;
//   entry.className = 'log-' + severity;
//   log.appendChild(entry);

//   // If the most recent entry in the log was visible, scroll the log to the
//   // newly added element.
//   if (mostRecentEntry != null &&
//       mostRecentEntry.getBoundingClientRect().top <
//           log.getBoundingClientRect().bottom) {
//     entry.scrollIntoView();
//   }
// }


function addToEventLog(...args) {
   console.log(args);
}

// Reads datagrams from |transport| into the event log until EOF is reached.
async function readDatagrams(transport) {
   try {
     var reader = transport.datagrams.readable.getReader();
     addToEventLog('Datagram reader ready.');
   } catch (e) {
     addToEventLog('Receiving datagrams not supported: ' + e, 'error');
     return;
   }
   let decoder = new TextDecoder('utf-8');
   try {
     while (true) {
       const { value, done } = await reader.read();
       if (done) {
         addToEventLog('Done reading datagrams!');
         return;
       }
       let data = decoder.decode(value);
       addToEventLog('Datagram received: ' + data);
     }
   } catch (e) {
     addToEventLog('Error while reading datagrams: ' + e, 'error');
   }
 }

 async function connect() {
   try {
     var transport = new WebTransport('https://localhost:41234');
     addToEventLog('Initiating connection...');
   } catch (e) {
     addToEventLog('Failed to create connection object. ' + e, 'error');
     return;
   }
 
   try {
     await transport.ready;
     addToEventLog('Connection ready.');
   } catch (e) {
     addToEventLog('Connection failed. ' + e, 'error');
     return;
   }
 
   transport.closed
       .then(() => {
         addToEventLog('Connection closed normally.');
       })
       .catch(() => {
         addToEventLog('Connection closed abruptly.', 'error');
       });
 
   currentTransport = transport;
   streamNumber = 1;
   try {
     currentTransportDatagramWriter = transport.datagrams.writable.getWriter();
     addToEventLog('Datagram writer ready.');
   } catch (e) {
     addToEventLog('Sending datagrams not supported: ' + e, 'error');
     return;
   }
   readDatagrams(transport);
 }

useEffect(() => {
   connect();

}, []);

   return (
      <div style={{ width: '100%', height: '100vh' }}>
         <Canvas>
            <Stats />
            <PerspectiveCamera position={[25, 25, 25]} fov={70} makeDefault />
            <color attach="background" args={['black']} />
            <fog attach="fog" color="black" near={50} far={300} />
            <Lighting />
            <Suspense fallback={<Loader />}>
               <RemotePlayers clientSocket={socket} />
               <LocalPlayer clientSocket={socket} />
               <Ground />
               <Forest />
            </Suspense>
         </Canvas>

         <OverlayUIWrapper socket={socket} />
         <PlayerAudioConnection socket={socket} />
      </div>
   )
}

export default App

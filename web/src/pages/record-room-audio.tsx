/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
import { useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Toast } from '@/components/ui/toast'
import { Mic, Pause } from 'lucide-react'

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === 'function' &&
  typeof window.MediaRecorder === 'function'

type RoomParams = {
  roomId: string
}

export function RecordRoomAudio() {
  const params = useParams<RoomParams>()
  const [isRecording, setIsRecording] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const recorder = useRef<MediaRecorder | null>(null)
  const intervalRef = useRef<NodeJS.Timeout>(null)
  const streamRef = useRef<MediaStream | null>(null)

  function stopRecording() {
    setIsRecording(false)

    if (recorder.current && recorder.current.state !== 'inactive') {
      recorder.current.stop()
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // Libera o microfone
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }

    setToastMsg('Gravação finalizada e microfone liberado!')
    setShowToast(true)
  }

  async function uploadAudio(audio: Blob) {
    const formData = new FormData()

    formData.append('file', audio, 'audio.webm')

    const response = await fetch(
      `http://localhost:3333/rooms/${params.roomId}/audio`,
      {
        method: 'POST',
        body: formData,
      }
    )

    const result = await response.json()

    console.log(result)
  }

  function createRecorder(audio: MediaStream) {
    recorder.current = new MediaRecorder(audio, {
      mimeType: 'audio/webm',
      audioBitsPerSecond: 64_000,
    })

    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data)
      }
    }

    recorder.current.onstart = () => {
      console.log('Gravação iniciada!')
    }

    recorder.current.onstop = () => {
      console.log('Gravação encerrada/pausada')
    }

    recorder.current.start()
  }

  async function startRecording() {
    if (!isRecordingSupported) {
      alert('O seu navegador não suporta gravação')
      return
    }

    setIsRecording(true)

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    })

    streamRef.current = audio
    createRecorder(audio)

    intervalRef.current = setInterval(() => {
      recorder.current?.stop()
      createRecorder(audio)
    }, 5000)
  }

  if (!params.roomId) {
    return <Navigate replace to="/" />
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md rounded-2xl bg-zinc-900 p-8 shadow-lg flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <div className={`rounded-full p-4 ${isRecording ? 'bg-red-600/20 animate-pulse' : 'bg-zinc-800'}`}> 
            {isRecording ? (
              <Mic className="size-10 text-red-500" />
            ) : (
              <Pause className="size-10 text-zinc-400" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            {isRecording ? 'Gravando Áudio...' : 'Gravação de Áudio'}
          </h2>
          <p className="text-muted-foreground text-center">
            {isRecording
              ? 'Seu áudio está sendo gravado e salvo automaticamente a cada 5 segundos.'
              : 'Clique para iniciar a gravação do áudio da sala.'}
          </p>
        </div>
        <Button
          onClick={isRecording ? stopRecording : startRecording}
          className={`w-full flex items-center gap-2 ${isRecording ? 'bg-red-600 hover:bg-red-700' : ''}`}
          type="button"
        >
          {isRecording ? <Pause className="size-4" /> : <Mic className="size-4" />}
          {isRecording ? 'Pausar gravação' : 'Gravar áudio'}
        </Button>
        <div className="w-full flex justify-center">
          {isRecording ? (
            <span className="text-red-500 font-medium animate-pulse">Gravando...</span>
          ) : (
            <span className="text-zinc-400">Pausado</span>
          )}
        </div>
      </div>
      <Toast
        message={toastMsg}
        open={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  )
}

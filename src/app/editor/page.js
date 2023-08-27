'use client'
 
import Editor, { useMonaco } from '@monaco-editor/react'
import { useEffect, useState } from 'react'
import localforage from 'localforage'

export default function CodeEditor() {
  const [defaultCode, setDefaultCode] = useState('')
  const [theme, setTheme] = useState('vs')
  const [languages, setLanguages] = useState([])
  const [selectedLang, setSelectedLang] = useState('javascript')
  const [isConverting, setIsConverting] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const [outputCode, setOutputCode] = useState('Your output will be shown here')
  const monaco = useMonaco()

  const loadDefaultCode = async () => {
    const fallback = '// write some pseudo code however you like'
    try {
      const localCode = await localforage.getItem('code')
      setDefaultCode(localCode || fallback)
    } catch (error) {
      setDefaultCode(fallback)
    }
  }

  const loadLanguages = (monaco) => {
    const loadedLanguages = monaco.languages.getLanguages()
    setLanguages(loadedLanguages.map(({ id }) => id))
  }

  const convertText = async () => {
    setIsConverting(true)

    const code = await localforage.getItem('code')

    const response = await fetch('/convert', {
      method: 'POST',
      body: JSON.stringify({
        language: selectedLang,
        input: code,
      }),
    })

    if (!response.ok) {
      window.alert('Something went wrong, check the network panel idk')
    }

    const data = await response.json()
    setOutputCode(data.output)

    setIsConverting(false)
    setIsDisabled(true)
  }

  useEffect(() => {
    loadDefaultCode()
  }, [])

  useEffect(() => {
    if (monaco) {
      loadLanguages(monaco)
    }
  }, [monaco])

  if (!defaultCode) {
    return null
  }

  return (
    <>
      <div className="grid h-screen grid-cols-2 gap-2 bg-black">
        <div className="relative">
          <Editor
            height="100vh"
            defaultLanguage="raw"
            theme={theme}
            defaultValue={defaultCode}
            onChange={(code) => {
              setIsDisabled(false)
              localforage.setItem('code', code)
            }}
            options={{
              padding: {
                top: 40,
              },
              minimap: {
                enabled: false,
              },
            }}
          />
          <div className="absolute top-0 left-0 right-0 z-50 flex items-center h-8 p-1 bg-black">
            <select
              onChange={(e) => {
                setTheme(e.target.value)
              }}
              value={theme}
              className="text-sm"
            >
              <option value="vs">vs (default)</option>
              <option value="vs-dark">vs dark</option>
              <option value="hc-light">hc light</option>
              <option value="hc-black">hc black</option>
            </select>
          </div>
        </div>
        <div className="relative">
          <Editor
            height="100vh"
            defaultLanguage={selectedLang}
            theme={theme}
            value={outputCode}
            options={{
              padding: {
                top: 40,
              },
              minimap: {
                enabled: false,
              },
              readOnly: true,
            }}
          />
          <div className="absolute top-0 left-0 right-0 z-50 flex items-center h-8 p-1 pl-0 bg-black">
            <select
              onChange={(e) => {
                setSelectedLang(e.target.value)
                setIsDisabled(false)
              }}
              value={selectedLang}
              className="block w-40 h-5 text-sm border-none outline-none"
            >
              {languages.map((lang) => {
                return (
                  <option key={lang} value={lang}>{lang}</option>
                )
              })}
            </select>
            {!isConverting && (
              <button
                type="button"
                className="flex items-center justify-center w-6 h-5 text-xl leading-none text-white bg-orange-500 border-none cursor-pointer hover:bg-orange-600 disabled:opacity-50"
                disabled={isDisabled}
                onClick={() => {
                  convertText()
                }}
              >
                <span>⏵</span>
              </button>
            )}

            {isConverting && (
              <button
                type="button"
                className="flex items-center justify-center w-6 h-5 text-xl leading-none text-orange-500 border-none"
                disabled
              >
                <div
                  className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status">
                  <span
                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                  />
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

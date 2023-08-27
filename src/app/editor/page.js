'use client'
 
import Editor, { useMonaco } from '@monaco-editor/react'
import { useEffect, useState } from 'react'
import localforage from 'localforage'

export default function CodeEditor() {
  const [defaultCode, setDefaultCode] = useState('')
  const [theme, setTheme] = useState('vs')
  const [languages, setLanguages] = useState([])
  const [selectedLang, setSelectedLang] = useState('javascript')
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
          <div className="absolute top-0 left-0 right-0 z-50 h-8 p-1 bg-black">
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
            defaultValue="your output will show here"
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
          <div className="absolute top-0 left-0 right-0 z-50 h-8 p-1 pl-0 bg-black">
            <select
              onChange={(e) => {
                setSelectedLang(e.target.value)
              }}
              value={selectedLang}
              className="w-40 text-sm"
            >
              {languages.map((lang) => {
                return (
                  <option key={lang} value={lang}>{lang}</option>
                )
              })}
            </select>
          </div>
        </div>
      </div>
    </>
  )
}

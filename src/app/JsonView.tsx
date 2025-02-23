import * as React from 'react'
import * as Prism from 'prismjs'
import 'prismjs/themes/prism-coy.css'
import { StoreContext } from '@/store'
import { observer } from 'mobx-react'

export function LayoutJsonView({ model }: any) {

    const timer = React.useRef<NodeJS.Timeout | undefined>(undefined)
    const [json, setJson] = React.useState<string>('')

    React.useEffect(() => {
        const onModelChange = () => {
            if (timer) {
                clearTimeout(timer.current)
            }
            timer.current = setTimeout(() => {
                update()
                timer.current = undefined
            }, 1000)
        }
        model.addChangeListener(onModelChange)
        update()
        return () => {
            model.removeChangeListener(onModelChange)
        }
    }, [])
    const update = () => {
        const jsonText = JSON.stringify(model.toJson(), null, '\t')
        const newJson = Prism.highlight(jsonText, Prism.languages.javascript, 'javascript')
        setJson(newJson)
    }

    return (
        <pre style={{ tabSize: '20px' }} dangerouslySetInnerHTML={{ __html: json! }} />
    )
}

export const VideoJsonView = observer((_props: {}) => {
    const timer = React.useRef<NodeJS.Timeout | undefined>(undefined)
    const [json, setJson] = React.useState<string>('')
    const store = React.useContext(StoreContext)
    React.useEffect(() => {
        const onModelChange = () => {
            if (timer) {
                clearTimeout(timer.current)
            }
            timer.current = setTimeout(() => {
                update()
                timer.current = undefined
            }, 1000)
        }
        update()
    }, [store.editorElements])
    const update = () => {
        const jsonText = JSON.stringify(store.editorElements, null, '\t')
        const newJson = Prism.highlight(jsonText, Prism.languages.javascript, 'javascript')
        setJson(newJson)
    }
    return (
        <pre style={{ tabSize: '20px' }} dangerouslySetInnerHTML={{ __html: json }} />
    )
})

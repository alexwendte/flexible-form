import * as React from 'react'
import styled from 'styled-components/macro'

export const Input = ({ flexProps }) => {
  return <ShinyInput {...flexProps} />
}

export const Form = ({ flexPropsHelper, children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {React.Children.map(children, (child, index) => {
        console.log(child)
        if (child.type.name !== 'Input') return child
        return React.cloneElement(child, { flexProps: flexPropsHelper(index) })
      })}
    </div>
  )
}

const InputContext = React.createContext({})

const App = () => {
  const [globalValue, setGlobalValue] = React.useState({ 0: 'go0', 1: 'go1', 2: 'go2', 3: 'go3', 4: 'go4' })

  const setValueSuper = (string, key) => {
    setGlobalValue({ ...globalValue, [key]: string })
  }

  const valueHelper = index => {
    if (globalValue[index] === undefined) {
      setGlobalValue({ ...globalValue, [index]: '' })
      return ''
    }
    return globalValue[index]
  }

  const onChangeHelper = (e, index) => setValueSuper(e.currentTarget.value, index)

  const flexPropsHelper = index => ({ value: valueHelper(index), onChange: e => onChangeHelper(e, index) })

  return (
    <Wrapper className="App">
      <h1>Victor</h1>
      <InputContext.Provider value={{ value: globalValue, setValue: setValueSuper }}>
        <div>
          <Form flexPropsHelper={flexPropsHelper}>
            <Input />
            <label>hey there</label>
            <Input />
            <label>hey there</label>
            <Input />
            <label>hey there</label>
            <Input />
          </Form>
        </div>
        <p>
          Input0 Value: <b>{globalValue[0]}</b>
        </p>
        <p>
          Input1 Value: <b>{globalValue[1]}</b>
        </p>
        <p>
          Input2 Value: <b>{globalValue[2]}</b>
        </p>
        <p>
          Input3 Value: <b>{globalValue[3]}</b>
        </p>
      </InputContext.Provider>
    </Wrapper>
  )
}

export default App

const Wrapper = styled.div`
  padding: 32px;
`

const ShinyInput = styled.input`
  background: coral;
  color: white;
  font-weight: 600;
  padding: 12px 8px;
  max-width: 600px;
  margin: 20px 0;
  border: none;
  border-radius: 5px;
`

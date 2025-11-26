import { useRef, type FormEvent } from "react"
import { Form, Col, Row, Stack, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import CreateableReactSelect from "react-select/creatable"

// Define the type BEFORE you use it
type NoteData = {
  title: string
  markdown: string
  tags: { label: string; value: string }[]
}

// FIXED: Add => void
type NoteFormProps = {
  onSubmit: (data: NoteData) => void
}

export default function NewNote({ onSubmit }: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null)
  const markdownRef = useRef<HTMLTextAreaElement>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: []
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} required />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreateableReactSelect isMulti />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="markdown">
          <Form.Label>Body</Form.Label>
          <Form.Control ref={markdownRef} required as="textarea" rows={15} />
        </Form.Group>

        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button type="submit" variant="primary">Save</Button>
          <Link to="..">
            <Button type="button" variant="outline-secondary">Cancel</Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  )
}

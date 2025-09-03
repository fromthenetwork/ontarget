import { Container, Image, Input, Text } from "@chakra-ui/react"
import {
  Link as RouterLink,
  createFileRoute,
  redirect,
} from "@tanstack/react-router"
import { type SubmitHandler, useForm } from "react-hook-form"
import { FiLock, FiMail } from "react-icons/fi"
import { useState } from "react"

import type { Body_login_login_access_token as AccessToken } from "@/client"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { InputGroup } from "@/components/ui/input-group"
import { PasswordInput } from "@/components/ui/password-input"
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import useAuth, { isLoggedIn } from "@/hooks/useAuth"
import Logo from "/assets/images/ontarget-logo.svg"
import { emailPattern, passwordRules } from "../utils"

export const Route = createFileRoute("/login")({
  component: Login,
  beforeLoad: async () => {
    if (isLoggedIn()) {
      throw redirect({
        to: "/",
      })
    }
  },
})

interface DemoFormData {
  demoCode: string
}

function Login() {
  const { loginMutation, error, resetError } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [demoError, setDemoError] = useState<string>("")

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AccessToken>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const {
    register: registerDemo,
    handleSubmit: handleDemoSubmit,
    formState: { isSubmitting: isDemoSubmitting },
    reset: resetDemoForm,
  } = useForm<DemoFormData>({
    mode: "onBlur",
    defaultValues: {
      demoCode: "",
    },
  })

  const onSubmit: SubmitHandler<AccessToken> = async (data) => {
    if (isSubmitting) return

    resetError()

    try {
      await loginMutation.mutateAsync(data)
    } catch {
      // error is handled by useAuth hook
    }
  }

  const onDemoSubmit: SubmitHandler<DemoFormData> = async (data) => {
    if (isDemoSubmitting) return

    setDemoError("")

    const expectedDemoCode = import.meta.env.VITE_DEMO_CODE
    const demoUsername = import.meta.env.VITE_DEMO_USERNAME
    const demoPassword = import.meta.env.VITE_DEMO_PASSWORD

    if (!expectedDemoCode || !demoUsername || !demoPassword) {
      setDemoError("Demo configuration is missing. Please contact support.")
      return
    }

    if (data.demoCode !== expectedDemoCode) {
      setDemoError("Invalid demo code. Please try again.")
      return
    }

    // Close modal and reset form
    setIsModalOpen(false)
    resetDemoForm()

    // Login with demo credentials
    try {
      await loginMutation.mutateAsync({
        username: demoUsername,
        password: demoPassword,
      })
    } catch {
      // error is handled by useAuth hook
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setDemoError("")
    resetDemoForm()
  }

  const handleOpenChange = (details: { open: boolean }) => {
    if (!details.open) {
      handleModalClose()
    } else {
      setIsModalOpen(true)
    }
  }

  return (
      <>
        <Container
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            h="100vh"
            maxW="sm"
            alignItems="stretch"
            justifyContent="center"
            gap={4}
            centerContent
        >
          <Image
              src={Logo}
              alt="FastAPI logo"
              height="auto"
              maxW="2xs"
              alignSelf="center"
              mb={4}
          />
          <Field
              invalid={!!errors.username}
              errorText={errors.username?.message || !!error}
          >
            <InputGroup w="100%" startElement={<FiMail />}>
              <Input
                  id="username"
                  {...register("username", {
                    required: "Username is required",
                    pattern: emailPattern,
                  })}
                  placeholder="Email"
                  type="email"
              />
            </InputGroup>
          </Field>
          <PasswordInput
              type="password"
              startElement={<FiLock />}
              {...register("password", passwordRules())}
              placeholder="Password"
              errors={errors}
          />
          <RouterLink to="/recover-password" className="main-link">
            Forgot Password?
          </RouterLink>
          <Button variant="solid" type="submit" loading={isSubmitting} size="md">
            Log In
          </Button>

          <DialogRoot open={isModalOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <Button variant="outline" size="md" mt={2}>
                TRY DEMO
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Enter Demo Code</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <form onSubmit={handleDemoSubmit(onDemoSubmit)} id="demo-form">
                  <Field invalid={!!demoError} errorText={demoError}>
                    <Input
                        {...registerDemo("demoCode", {
                          required: "Demo code is required",
                        })}
                        placeholder="Enter demo code"
                        autoFocus
                    />
                  </Field>
                </form>
              </DialogBody>
              <DialogFooter>
                <DialogActionTrigger asChild>
                  <Button variant="outline" onClick={handleModalClose}>
                    Cancel
                  </Button>
                </DialogActionTrigger>
                <Button
                    type="submit"
                    form="demo-form"
                    loading={isDemoSubmitting}
                    variant="solid"
                >
                  Access Demo
                </Button>
              </DialogFooter>
              <DialogCloseTrigger />
            </DialogContent>
          </DialogRoot>

          <Text>
            Don't have an account?{" "}
            <RouterLink to="/signup" className="main-link">
              Sign Up
            </RouterLink>
          </Text>
        </Container>
      </>
  )
}
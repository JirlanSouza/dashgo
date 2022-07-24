import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "@components/Form/Input";
import { Header } from "@components/Header";
import { Sidebar } from "@components/Sidebar";
import { useCreateUser } from "@services/hooks/useCreateUser";
import { useRouter } from "next/router";
import { withSSRAuth } from "@utils/withSSRAuth";

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const createUserFormSchema = yup.object().shape({
  name: yup
    .string()
    .required("Nome obrigatório")
    .min(3, "O nome deve ter no minímo 3 caracteres"),
  email: yup.string().required("E-mail obrigatótio").email("E-mail inválido"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "A senha deve ter no minímo 6 caracteres"),
  passwordConfirmation: yup
    .string()
    .oneOf(
      [null, yup.ref("password")],
      "Senha e confirmação de senha devem ser iguais"
    ),
});

export default function CreateUser(): JSX.Element {
  const toast = useToast();
  const router = useRouter();
  const createUser = useCreateUser();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });

  const createUserHandle: SubmitHandler<CreateUserFormData> = async (
    values
  ) => {
    await createUser.mutateAsync(values);

    console.log("users", createUser);

    if (createUser.isError) {
      toast({
        title: "Error ao criar usuário.",
        description: "Ouve um error ao criar o novo usuário!",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });

      return;
    }

    toast({
      title: "Usuário criado.",
      description: "O usuário foi criado com sucesso!",
      status: "success",
      duration: 3000,
      position: "top",
      isClosable: true,
    });

    router.push("/users");
  };

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          onSubmit={handleSubmit(createUserHandle)}
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
        >
          <Heading size="lg" fontWeight="normal">
            Criar usuário
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing={["6", "8"]}>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="name"
                label="Nome completo"
                error={formState.errors.name}
                {...register("name")}
              />
              <Input
                name="email"
                type="email"
                label="E-mail"
                error={formState.errors.email}
                {...register("email")}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="password"
                type="password"
                label="Senha"
                error={formState.errors.password}
                {...register("password")}
              />
              <Input
                name="password_confirmation"
                type="password"
                label="Confirmar senha"
                error={formState.errors.password_confirmation}
                {...register("passwordConfirmation")}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Button
                colorScheme="whiteAlpha"
                disabled={formState.isSubmitting}
                onClick={() => router.back()}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                colorScheme="pink"
                isLoading={formState.isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export const getServerSideProps = withSSRAuth(
  async () => {
    return {
      props: {},
    };
  },
  {
    permissions: ["users.create"],
    roles: ["administrator"],
  }
);

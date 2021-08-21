import React from 'react';

import {
	Button,
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
	useMediaQuery,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import { IViewProps, Sizes, Strings } from 'data/constants';
import { IUserCredentials } from 'data/models';
import { signIn } from 'data/services';
import { setLoading, setUser } from 'data/store';
import { setSize } from 'utils/helpers';

import { BannerImage, Overlay, Text } from 'components';

export const SignInView: React.FC<IViewProps> = ({ banner, id }) => {
	const [isLargeScreen] = useMediaQuery(
		`(min-width: ${Sizes.breakPoint}px)`
	);

	const dispatch = useDispatch();

	const INITIAL_STATE: IUserCredentials = {
		email: ``,
		password: ``,
	};
	const [credentials, setCredentials] = React.useState(INITIAL_STATE);
	const { email, password } = credentials;

	const [errMsg, setErrMsg] = React.useState(``);
	const [submitted, setSubmitted] = React.useState(false);

	const {
		site: { title },
	} = Strings;

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = e =>
		setCredentials({ ...credentials, [e.target.name]: e.target.value });

	const handleSubmit: React.FormEventHandler<HTMLDivElement> = async e => {
		e.preventDefault();
		setSubmitted(true);
	};

	React.useEffect(() => {
		const processSubmit = async () => {
			console.log(`processSignIn`);

			dispatch(setLoading(true));
			const response = await signIn(credentials);
			if (response.failure) {
				setErrMsg(response.failure);
			} else if (response.success) {
				if (response.success.user) {
					const id = response.success.user.uid;
					dispatch(setUser(id));
				}
			}
		};
		if (submitted) {
			processSubmit();
			setSubmitted(false);
		}
	}, [credentials, dispatch, submitted]);

	return (
		<>
			<Flex flex={1} justifyContent="center" mx={setSize(Sizes.gap)}>
				<Flex
					alignItems="center"
					flexDir="column"
					maxW={setSize(30)}
					onSubmit={handleSubmit}
					w="full"
				>
					<BannerImage {...banner} id="signIn" overlay={Overlay.medium}>
						<Flex alignItems="center" flex={1} justifyContent="center">
							<Text
								fontFamily="Great Vibes"
								fontSize={setSize(isLargeScreen ? 2.6 : 1.8)}
								lineHeight={1.25}
								pl={setSize(0.111)}
								pr={setSize(0.444)}
								textShadow="2px 2px 2px rgba(0, 0, 0, 0.4)"
							>
								{`Welcome to ${title}!`}
							</Text>
						</Flex>
					</BannerImage>
					<Flex
						as="form"
						flexDir="column"
						justifyContent="center"
						maxW={setSize(22.222)}
						onSubmit={handleSubmit}
						w="full"
					>
						<FormControl id="email">
							<FormLabel>Email Address</FormLabel>
							<Input
								name="email"
								onChange={handleChange}
								required
								type="email"
								value={email}
							/>
							<FormHelperText fontStyle="italic" textAlign="end">
								We'll never share your email.
							</FormHelperText>
						</FormControl>
						<FormControl id="password">
							<FormLabel>Password</FormLabel>
							<Input
								name="password"
								onChange={handleChange}
								required
								type="password"
								value={password}
							/>
						</FormControl>
						{errMsg && (
							<Flex>
								<Text>{errMsg}</Text>
							</Flex>
						)}
						<Button mt={setSize(Sizes.gap * 1.5)} type="submit">
							Submit
						</Button>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};

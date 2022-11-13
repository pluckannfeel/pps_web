import { Text, Box, Popover, Progress, PasswordInput } from '@mantine/core';
import { CheckIcon, Cross1Icon } from '@radix-ui/react-icons';
import { useContext, useState } from 'react';
import { isPropertySignature } from 'typescript';

// import { isPropertySignature } from 'typescript';

// language
import { LangContextProps } from '../store/lang-props';
import LangContext from '../store/lang-context';
import { languageContent } from '../store/languageContent';

export const PasswordRequirement = ({
    meets,
    label
}: {
    meets: boolean;
    label: string;
}) => {
    return (
        <Text
            color={meets ? 'teal' : 'red'}
            sx={{ display: 'flex', alignItems: 'center' }}
            mt={7}
            size="sm"
        >
            {meets ? <CheckIcon /> : <Cross1Icon />} <Box ml={10}>{label}</Box>
        </Text>
    );
};

export const passwordValidations = [
    { va: /^.{8,}$/, label: 'At least 8 characters' },
    { va: /[0-9]/, label: 'Includes number' },
    { va: /[a-z]/, label: 'Includes lowercase letter' },
    { va: /[A-Z]/, label: 'Includes uppercase letter' }

    // { va: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' }
];

export function getStrength(password: string) {
    let strength = 0;

    // requirements's re destructured from passwordValidation
    passwordValidations.forEach(({ va }) => {
        if (!va.test(password)) {
            strength++;
        }
    });

    return Math.max(100 - (100 / passwordValidations.length) * strength, 10);
}

interface PasswordInputWithStrengthProps {
    formInputProps: any;
}

const PasswordInputWithStrength: React.FunctionComponent<
    PasswordInputWithStrengthProps
> = (props) => {
    const [popoverOpened, setPopoverOpened] = useState(false);
    const [value, setValue] = useState('');
    const checks = passwordValidations.map((requirement, index) => (
        <PasswordRequirement
            key={index}
            label={requirement.label}
            meets={requirement.va.test(value)}
        />
    ));

    const strength = getStrength(value);
    const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

    const { otherHandler, onChange: formOnChange } = props.formInputProps;

        // language
    const { language: selectedLanguage } = useContext(LangContext) as LangContextProps;

    const langSetup = {
        registerPasswordLabel : selectedLanguage === 'en' ? languageContent.en.registerUserPasswordLabel : languageContent.jp.registerUserPasswordLabel,
        registerPasswordSuggestion: selectedLanguage === 'en' ? languageContent.en.registerUserPasswordSuggestion : languageContent.jp.registerPasswordSuggestion,
    }

    return (
        <Popover
            opened={popoverOpened}
            position="bottom"
            // placement="start"
            withArrow
            // styles={{ popover: { width: '100%' } }}
            trapFocus={false}
            transition="pop-top-left"
        >
            <Popover.Target>
                <div
                    onFocusCapture={() => setPopoverOpened(true)}
                    onBlurCapture={() => setPopoverOpened(false)}
                >
                    <PasswordInput
                        required
                        label={langSetup.registerPasswordLabel}
                        placeholder={langSetup.registerPasswordLabel}
                        description={langSetup.registerPasswordSuggestion}
                        value={value}
                        onChange={(event) => {
                            setValue(event.target.value);
                            formOnChange(event);
                        }}
                        {...otherHandler}
                    />
                </div>
            </Popover.Target>

            <Popover.Dropdown>
                <Progress
                    color={color}
                    value={strength}
                    size={5}
                    style={{ marginBottom: 10 }}
                />
                {checks}
            </Popover.Dropdown>
        </Popover>
    );
};

export default PasswordInputWithStrength;

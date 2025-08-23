import GeneratorTemplate from "../../../templates/GeneratorTemplate";

interface PasswordGeneratorToolProps {
  tool: {
    name: string;
    description: string;
    category: string;
  };
}

export default function PasswordGeneratorTool({ tool }: PasswordGeneratorToolProps) {
  const generatePassword = (options: Record<string, any>): string => {
    const { 
      length, 
      includeUppercase, 
      includeLowercase, 
      includeNumbers, 
      includeSymbols,
      excludeSimilar,
      count 
    } = options;

    let charset = '';
    
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (excludeSimilar) {
      charset = charset.replace(/[il1Lo0O]/g, '');
    }

    if (!charset) {
      return 'Please select at least one character type.';
    }

    const passwords = [];
    
    for (let p = 0; p < count; p++) {
      let password = '';
      for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      passwords.push(password);
    }

    return passwords.join('\n');
  };

  const options = [
    {
      key: 'length',
      label: 'Password Length',
      type: 'number' as const,
      defaultValue: 12,
      min: 4,
      max: 128
    },
    {
      key: 'count',
      label: 'Number of Passwords',
      type: 'number' as const,
      defaultValue: 1,
      min: 1,
      max: 20
    },
    {
      key: 'includeUppercase',
      label: 'Include Uppercase Letters (A-Z)',
      type: 'checkbox' as const,
      defaultValue: true
    },
    {
      key: 'includeLowercase',
      label: 'Include Lowercase Letters (a-z)',
      type: 'checkbox' as const,
      defaultValue: true
    },
    {
      key: 'includeNumbers',
      label: 'Include Numbers (0-9)',
      type: 'checkbox' as const,
      defaultValue: true
    },
    {
      key: 'includeSymbols',
      label: 'Include Symbols (!@#$%^&*)',
      type: 'checkbox' as const,
      defaultValue: true
    },
    {
      key: 'excludeSimilar',
      label: 'Exclude Similar Characters (i, l, 1, L, o, 0, O)',
      type: 'checkbox' as const,
      defaultValue: false
    }
  ];

  return (
    <GeneratorTemplate
      tool={tool}
      options={options}
      onGenerate={generatePassword}
    />
  );
}
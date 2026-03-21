// Simple test suite for contact form validation
class TestRunner {
    constructor() {
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
    }

    test(name, fn) {
        this.tests.push({ name, fn });
    }

    run() {
        console.log('Running Contact Form Tests...\n');
        
        this.tests.forEach(test => {
            try {
                test.fn();
                this.passed++;
                console.log(`✓ ${test.name}`);
            } catch (error) {
                this.failed++;
                console.error(`✗ ${test.name}: ${error.message}`);
            }
        });
        
        console.log(`\n${this.passed} passed, ${this.failed} failed`);
        return this.failed === 0;
    }
}

function assertEquals(actual, expected, message) {
    if (actual !== expected) {
        throw new Error(message || `Expected ${expected}, got ${actual}`);
    }
}

function assertTrue(value, message) {
    if (!value) {
        throw new Error(message || 'Expected true');
    }
}

function assertFalse(value, message) {
    if (value) {
        throw new Error(message || 'Expected false');
    }
}

// Create test runner
const runner = new TestRunner();

// Test validation rules
runner.test('Name validation - should pass with valid name', () => {
    const result = /^.{1,}$/.test('John Doe');
    assertTrue(result, 'Valid name should pass');
});

runner.test('Name validation - should fail with empty name', () => {
    const result = /^.{1,}$/.test('');
    assertFalse(result, 'Empty name should fail');
});

runner.test('Email validation - should pass with valid email', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const result = emailRegex.test('user@example.com');
    assertTrue(result, 'Valid email should pass');
});

runner.test('Email validation - should fail with invalid email (no @)', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const result = emailRegex.test('userexample.com');
    assertFalse(result, 'Email without @ should fail');
});

runner.test('Email validation - should fail with invalid email (no domain)', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const result = emailRegex.test('user@example');
    assertFalse(result, 'Email without domain extension should fail');
});

runner.test('Message validation - should pass with valid message', () => {
    const result = 'Hello, this is a message'.trim().length > 0;
    assertTrue(result, 'Valid message should pass');
});

runner.test('Message validation - should fail with empty message', () => {
    const result = '   '.trim().length > 0;
    assertFalse(result, 'Empty message should fail');
});

runner.test('Email validation - should handle multiple domains', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    assertTrue(emailRegex.test('user@example.co.uk'), 'Multi-level domain should work');
    assertTrue(emailRegex.test('test@subdomain.example.com'), 'Subdomain should work');
});

// Export for Node.js testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { runner };
}

// Run tests if in Node.js
if (typeof process !== 'undefined' && process.argv[1] && process.argv[1].includes('contact-form.test.js')) {
    const success = runner.run();
    process.exit(success ? 0 : 1);
}

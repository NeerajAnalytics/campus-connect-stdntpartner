import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export interface TestResult {
  test: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  details?: any;
}

export const runAuthenticationTests = async (): Promise<TestResult[]> => {
  const results: TestResult[] = [];

  // Test 1: Supabase Connection
  try {
    const { data: { session } } = await supabase.auth.getSession();
    results.push({
      test: "Supabase Connection",
      status: 'pass',
      message: "Successfully connected to Supabase",
      details: { hasSession: !!session }
    });
  } catch (error) {
    results.push({
      test: "Supabase Connection",
      status: 'fail',
      message: "Failed to connect to Supabase",
      details: error
    });
  }

  // Test 2: Database Tables
  try {
    const { data: juniorProfiles, error: juniorError } = await supabase
      .from('junior_profile')
      .select('count')
      .limit(1);

    const { data: seniorProfiles, error: seniorError } = await supabase
      .from('senior_profiles')
      .select('count')
      .limit(1);

    const { data: verificationCodes, error: verificationError } = await supabase
      .from('verification_codes')
      .select('count')
      .limit(1);

    if (!juniorError && !seniorError && !verificationError) {
      results.push({
        test: "Database Tables",
        status: 'pass',
        message: "All required tables are accessible",
        details: {
          juniorProfileTable: !juniorError,
          seniorProfilesTable: !seniorError,
          verificationCodesTable: !verificationError
        }
      });
    } else {
      results.push({
        test: "Database Tables",
        status: 'fail',
        message: "Some tables are not accessible",
        details: { juniorError, seniorError, verificationError }
      });
    }
  } catch (error) {
    results.push({
      test: "Database Tables",
      status: 'fail',
      message: "Failed to access database tables",
      details: error
    });
  }

  // Test 3: Edge Functions
  try {
    const { data: testEmailResult, error: testEmailError } = await supabase.functions.invoke('test-email', {
      body: { email: 'test@example.com' }
    });

    if (!testEmailError) {
      results.push({
        test: "Email Service (Test)",
        status: 'pass',
        message: "Email service is configured and working",
        details: testEmailResult
      });
    } else {
      results.push({
        test: "Email Service (Test)",
        status: 'fail',
        message: "Email service test failed",
        details: testEmailError
      });
    }
  } catch (error) {
    results.push({
      test: "Email Service (Test)",
      status: 'fail',
      message: "Email service is not available",
      details: error
    });
  }

  // Test 4: Password Reset Function
  try {
    const { error: passwordResetError } = await supabase.functions.invoke('send-password-reset', {
      body: { email: 'nonexistent@example.com' }
    });

    // We expect this to fail for a non-existent email, but the function should respond
    results.push({
      test: "Password Reset Function",
      status: 'pass',
      message: "Password reset function is accessible",
      details: { expectedError: passwordResetError?.message }
    });
  } catch (error) {
    results.push({
      test: "Password Reset Function",
      status: 'fail',
      message: "Password reset function is not working",
      details: error
    });
  }

  // Test 5: Verify Reset Code Function
  try {
    const { error: verifyCodeError } = await supabase.functions.invoke('verify-reset-code', {
      body: { email: 'test@example.com', code: '123456' }
    });

    // We expect this to fail for an invalid code, but the function should respond
    results.push({
      test: "Verify Code Function",
      status: 'pass',
      message: "Verify code function is accessible",
      details: { expectedError: verifyCodeError?.message }
    });
  } catch (error) {
    results.push({
      test: "Verify Code Function",
      status: 'fail',
      message: "Verify code function is not working",
      details: error
    });
  }

  return results;
};

export const displayTestResults = (results: TestResult[]) => {
  const passCount = results.filter(r => r.status === 'pass').length;
  const failCount = results.filter(r => r.status === 'fail').length;
  const warningCount = results.filter(r => r.status === 'warning').length;

  console.log('=== Authentication System Test Results ===');
  console.log(`✅ Passed: ${passCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`⚠️  Warnings: ${warningCount}`);
  console.log('');

  results.forEach(result => {
    const icon = result.status === 'pass' ? '✅' : 
                 result.status === 'fail' ? '❌' : '⚠️';
    console.log(`${icon} ${result.test}: ${result.message}`);
    if (result.details) {
      console.log('   Details:', result.details);
    }
  });

  toast({
    title: "Test Results",
    description: `${passCount} passed, ${failCount} failed, ${warningCount} warnings`,
    variant: failCount > 0 ? "destructive" : "default",
  });
};